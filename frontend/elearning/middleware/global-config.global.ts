import { useCategoriesStore } from '@/stores/Categories';
import type { Category } from '@/types/category';
export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
    const now = Date.now();
    const TIME_RESET = 30 * 60 * 1000;
    const categoryStore = useCategoriesStore();
    if (!categoryStore.items.length || now - categoryStore.lastFetched > TIME_RESET) {
        categoryStore.lastFetched = now;
        const fetchCategories = async (): Promise<{ data: Category[]; totalCount: number }> => {
            const response = await $fetch<{ data: Category[]; totalCount: number }>(
                `/api/categories`,
                {
                    method: 'GET',
                    query: {
                        deep: {
                            products: {
                                _limit: 4
                            }
                        },
                        meta: 'total_count'
                    }
                }
            );
            return response;
        };

        const { data, status, error, refresh } = useAsyncData<{
            data: Category[];
            totalCount: number;
        }>('fetchCategories', () => fetchCategories());
        categoryStore.items = data.value?.data || [];
    }
});
