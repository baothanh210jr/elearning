import { defineEventHandler, getQuery, getRouterParams } from 'h3';
interface Response {
    data: any;
}
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const config = useRuntimeConfig();

    try {
        const response: Response = await $fetch(`${config.public.apiBase}/items/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            query,
            params: {
                sort: 'sort',
                fields: '*, products.*'
            }
        });
        return {
            data: response.data
        };
    } catch (error) {
        console.error('An error occurred:', error);
        throw createError({ statusCode: 500, message: 'Error occurred during login.' });
    }
});
