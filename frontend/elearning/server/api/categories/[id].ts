export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const config = useRuntimeConfig();

    try {
        const response = await $fetch(`${config.public.apiBase}/items/categories/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                fields: '*,products.*'
            }
        });

        return response;
    } catch (error) {
        console.error('An error occurred:', error);
        throw createError({ statusCode: 500, message: 'Error occurred during login.' });
    }
});
