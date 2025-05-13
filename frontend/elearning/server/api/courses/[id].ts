export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    const config = useRuntimeConfig()
    const cookies = parseCookies(event)
    const token =   
        getHeader(event, 'authorization')?.split(' ')[1] || // Lấy từ header nếu có  
        cookies.auth_token || // Nếu không có header, lấy từ cookie  
        null;  

    try {
        const response = await $fetch(`${config.public.apiBase}/items/courses/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            params: {  
                fields: '*,student.directus_users_id.avatar',  
            },
            
        });
        console.log("🚀 ~ defineEventHandler ~ response:", response)

        return response

    } catch (error) {
        console.error('An error occurred:', error);
        throw createError({ statusCode: 500, message: 'Error occurred during login.' });
    }
});
