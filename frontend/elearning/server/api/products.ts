import { defineEventHandler, getQuery, getRouterParams } from 'h3';
interface Response {
    data: any;
    meta: {
        total_count: number;
    };
}
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const config = useRuntimeConfig();
    const cookies = parseCookies(event);
    const token =
        getHeader(event, 'authorization')?.split(' ')[1] || // Lấy từ header nếu có
        cookies.auth_token || // Nếu không có header, lấy từ cookie
        null;

    try {
        const response: Response = await $fetch(`${config.public.apiBase}/items/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            query,
            params: {
                // sort: '-created_at',
                fields: '*,category,category.name'
            }
        });
        return {
            data: response.data,
            totalCount: response.meta.total_count
        };
    } catch (error) {
        console.error('An error occurred:', error);
        throw createError({ statusCode: 500, message: 'Error occurred during login.' });
    }
});
