<template>
    <div class="">
        <div
            v-if="categories?.data?.product?.length"
            class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative"
        >
            <div class="col-span-1" v-for="(item, index) in categories?.data.product" :key="index">
                <CardProduct
                    :product="{
                        ...item,
                        category_id: {
                            id: route.params.id as string,
                            name: categories?.data.name
                        }
                    }"
                />
            </div>
            <div class="absolute bottom-50 right-0 sentinel" ref="sentinel"></div>
            <div
                v-if="status === API_STATUS_SSR.PENDING"
                class="col-span-1"
                v-for="(item, index) in productsPending"
                :key="index"
            >
                <CardProduct
                    :product="{
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        statusPending: item.statusPending || false,
                        category_id: {
                            id: route.params.id as string,
                            name: item.name
                        },
                        price: item.price || 0
                    }"
                />
            </div>
        </div>
        <div v-else class="flex justify-center items-center h-screen">
            <p>No product available</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PAGE } from '@/constants/CommonConstant';
import type { Category } from '@/types/category';
import type { Product } from '@/types/product';
import { useRoute } from 'vue-router';
import { API_STATUS_SSR } from '@/constants/ApiConstant';

definePageMeta({
    name: PAGE.CATEGORIES
});

const route = useRoute();
const limit = ref(20);

const {
    data: categories,
    status,
    error,
    refresh
} = useAsyncData<{ data: Category; totalCount: number }>(
    'fetchCategoriesById',
    () => fetchCategoriesById(),
    {
        watch: [() => route.params.slug, () => route.params.id]
    }
);

async function fetchCategoriesById(): Promise<{ data: Category; totalCount: number }> {
    const response = await $fetch<{ data: Category; totalCount: number }>(
        `/api/categories/${route.params.id}`,
        {
            method: 'GET',
            headers: {},
            query: {
                limit: limit.value,
                meta: 'total_count'
            }
        }
    );
    return response;
}

const productsPending = computed(() => {
    if (status.value === 'pending' && categories.value?.data?.product.length) {
        const lengthArray = limit.value - categories.value?.data?.product.length;
        return Array.from(
            { length: lengthArray },
            (_, index) =>
                ({
                    id: `pending-${index}`,
                    name: 'Loading Product...',
                    description: 'Please wait',
                    statusPending: true
                }) as Product
        );
    } else {
        return [];
    }
});
</script>

<style scoped></style>
