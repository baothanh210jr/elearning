<template>
  <UCard class="h-110 flex flex-col shadow-md hover:bg-white">
    <template #header>
      <!-- Avatar -->
      <UAvatarGroup v-if="avatars?.length">
        <UAvatar
          v-for="(item, index) in avatars"
          :key="index"
          :src="`${config.public.apiBase}/assets/${item.directus_users_id.avatar}`"
          alt="Benjamin Canac"
        />
      </UAvatarGroup>
      <!-- Title -->
      <nuxt-link
        :to="{
          name: 'course-detail',
          params: { id: course.id, slug: convertToSlug(course.title) }
        }"
        class="cursor-pointer hover:underline"
      >
        <span v-if="!course.statusPending" class="text-lg font-semibold line-clamp-2">{{
          course.title
        }}</span>
        <USkeleton v-else class="h-10 w-full" />
      </nuxt-link>
    </template>
    <div class="flex flex-col gap-2 h-full">
      <!-- Thumbnail -->
      <div class="flex-1">
        <span v-if="!course.statusPending" class="text-sm text-gray-500 line-clamp-4">{{
          course.description
        }}</span>
        <USkeleton v-else class="h-15 w-full" />
      </div>
      <!-- Pricing -->
      <div class="flex items-center gap-2">
        <span
          v-if="!course.statusPending && course.pricing"
          class="text-lg font-semibold text-primary-500"
        >
          {{ course.discount?.toLocaleString() }}đ
        </span>
        <span
          v-if="!course.statusPending && course.discount"
          class="text-sm text-gray-500 line-through"
        >
          {{ course.pricing.toLocaleString() }}đ
        </span>
      </div>
      <!-- Datetime -->
      <div class="flex flex-col gap-2 mt-auto">
        <div class="flex items-center text-gray-500 text-sm">
          <USkeleton v-if="course.statusPending" class="h-4 w-full" />
          <span v-else>{{ formattedDate }} </span>
        </div>
        <div class="flex gap-2 flex-wrap">
          <span
            v-if="!course.statusPending"
            v-for="t in course.tags"
            :key="t"
            class="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
          >
            #{{ t }}
          </span>
        </div>
      </div>
    </div>
    <template #footer>
      <!-- Hình ảnh mô tả (thumbnail) -->
      <USkeleton v-if="course.statusPending" class="h-40 w-full" />
      <nuxt-link
        v-else
        :to="{
          name: 'course-detail',
          params: { id: course.id, slug: convertToSlug(course.title) }
        }"
      >
        <div class="aspect-16/9 cursor-pointer overflow-hidden rounded-lg">
          <img
            :src="`${config.public.apiBase}/assets//${course.thumbnail}`"
            alt="Article thumbnail"
            class="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </nuxt-link>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { Course } from '@/types/course';
import { convertToSlug } from '@/utils/String';

const config = useRuntimeConfig();
const props = defineProps<{
  course: Course;
}>();

const datetime = new Date(props.course.created_at);
const formattedDate = datetime.toLocaleDateString();
const applicationStore = useApplicationStore();

const avatars = computed(() => {
  return props.course.student?.filter(
    (item) => applicationStore.user?.avatar !== item.directus_users_id.avatar
  );
});
</script>
