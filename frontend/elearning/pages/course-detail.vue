<template>
  <div>
    <h1 class="text-2xl font-bold">{{ course?.data.title }}</h1>
    <div v-html="course?.data?.content" class="mt-5"></div>
  </div>
</template>

<script setup lang="ts">
import { PAGE } from '@/constants/CommonConstant';
import { ref } from 'vue';
import type { Course } from '@/types/course';

definePageMeta({
  name: PAGE.COURSE_DETAIL
});

const { id } = useRoute().params;

const authStore = useAuthentication();
const applicationStore = useApplicationStore();

const {
  data: course,
  status,
  error,
  refresh
} = await useAsyncData<{ data: Course }>('fetchCourseDetail', () =>
  $fetch(`/api/courses/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authStore.token}`
    }
  })
);
</script>

<style scoped></style>
