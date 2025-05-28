<template>
  <pre>course{{course}}</pre>
  <div>
    <h1 class="text-2xl font-bold">{{ course?.data.name }}</h1>
    <div v-html="course?.data?.description" class="mt-5"></div>
  </div>
</template>

<script setup lang="ts">
import { PAGE } from '@/constants/CommonConstant';
import { ref } from 'vue';
import type { Product } from '@/types/product';

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
} = await useAsyncData<{ data: Product }>('fetchCourseDetail', () =>
  $fetch(`/api/products/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authStore.token}`
    }
  })
);
</script>

<style scoped></style>
