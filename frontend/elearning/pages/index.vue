<template>
  <div class="container">
    <div
      v-if="courses?.data?.length"
      class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative"
    >
      <div class="col-span-1" v-for="(item, index) in courses?.data" :key="index">
        <CardProduct :product="item"  />
      </div>
      <div class="absolute bottom-50 right-0 sentinel" ref="sentinel"></div>
      <div
        v-if="status === API_STATUS_SSR.PENDING"
        class="col-span-1"
        v-for="(item, index) in coursesPending"
        :key="index"
      >
        <!-- <CardCourse :course="item" /> -->
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-screen">
      <p>No courses available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from '@/types/product';
import { PAGE } from '@/constants/CommonConstant';
import { API_STATUS_SSR } from '@/constants/ApiConstant';

definePageMeta({
  name: PAGE.HOME
});

const LIMIT_COURSES = 10;
const limit = ref(20);
const totalCount = ref(0);
const authStore = useAuthentication();
const applicationStore = useApplicationStore();
const documentHeight = ref(document?.documentElement.scrollHeight);
const sentinel = ref<HTMLDivElement | null>(null);

const coursesPending = computed(() => {
  if (status.value === 'pending' && courses.value?.data.length) {
    const lengthArray = limit.value - courses.value?.data.length;
    return Array.from(
      { length: lengthArray },
      (_, index) =>
        ({
          id: `pending-${index}`,
          name: 'Loading Course...',
          description: 'Please wait',
          statusPending: true
        }) as Product
    );
  } else {
    return [];
  }
});

const {
  data: courses,
  status,
  error,
  refresh
} = useAsyncData<{ data: Product[]; totalCount: number }>('fetchCourses', () => fetchCourses(), {
  watch: [() => applicationStore.user?.id, limit]
});

async function fetchCourses(): Promise<{ data: Product[]; totalCount: number }> {
  console.log('🚀 ~ index.vue:77 ~ fetchCourses ~ authStore:', authStore);
  const response = await $fetch<{ data: Product[]; totalCount: number }>(`/api/products`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authStore.token}`
    },
    query: {
      limit: limit.value,
      meta: 'total_count'
    }
  });
  return response;
}

const loadMore = async () => {
  totalCount.value = courses.value?.totalCount || 0;
  if (status.value !== API_STATUS_SSR.PENDING && limit.value < totalCount.value) {
    limit.value += LIMIT_COURSES;
  }
};

const loadMoreOnIntersect = async (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting) {
    loadMore();
  }
};

let observer: IntersectionObserver;

onMounted(() => {
  onMounted(() => {
    // If the sentinel element exists in the DOM
    if (sentinel.value) {
      // Create an IntersectionObserver instance with a callback and options.
      // The callback (loadMoreOnIntersect) will be invoked when the sentinel
      // meets the condition of being fully within the viewport (threshold: 1.0).
      observer = new IntersectionObserver(loadMoreOnIntersect, {
        root: null,       // Use the browser viewport as the root.
        threshold: 1.0    // Trigger the callback when 100% of the sentinel is visible.
      });
      // Start observing the sentinel element.
      observer.observe(sentinel.value);
    }
  });
});
onUnmounted(() => {
  if (observer && sentinel.value) {
    observer.unobserve(sentinel.value);
  }
});
</script>
