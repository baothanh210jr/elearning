import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import type { Category } from '@/types/category';

export const useCategoriesStore = defineStore('categories', () => {
    const items = ref<Category[]>([]);
    const lastFetched = ref(0);

    return {
        items,
        lastFetched
    };
});
