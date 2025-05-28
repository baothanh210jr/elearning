<template>
    <aside class="lg:px-4">
        <nav class="text-black">
            <!-- Menu chính -->
            <ul class="flex justify-center items-center gap-4">
                <li v-for="(menu, index) in categories?.data" :key="index">
                    <!-- <pre>{{ categories?.data }}</pre> -->
                    <NuxtLink
                        :to="{
                            name: PAGE.CATEGORIES,
                            params: {
                                category: convertToSlug(menu.name),
                                id: menu.id
                            }
                        }"
                        class="flex items-center gap-3 text-sm text-primary-200 font-medium hover:text-primary hover:font-semibold transition-colors duration-300"
                    >
                        <!-- <UIcon :name="menu.icon" class="size-5 text-black" /> -->
                        <span>{{ menu.name }}</span>
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { PAGE } from '@/constants/CommonConstant';
import type { Category } from '@/types/category';

const fetchCategories = async (): Promise<{ data: Category[]; totalCount: number }> => {
    const response = await $fetch<{ data: Category[]; totalCount: number }>(`/api/categories`, {
        method: 'GET',
        query: {
            meta: 'total_count'
        }
    });
    return response;
};

const {
    data: categories,
    status,
    error,
    refresh
} = useAsyncData<{ data: Category[]; totalCount: number }>('fetchCategories', () =>
    fetchCategories()
);
</script>
