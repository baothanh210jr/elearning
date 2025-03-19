import { API_RESPONSE_STATUS_CODE } from '@/constants/ApiConstant';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const response = await fetch('http://localhost:8055/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const { data } = await response.json();

    // Log JSON
    if (response.status !== API_RESPONSE_STATUS_CODE.SUCCESS) {
      return {
        status: response.status,
        data
      };
    }
    if (data.access_token) {
      setCookie(event, 'auth_token', data.access_token, {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
      return { success: true };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw createError({ statusCode: 500, message: 'Error occurred during login.' });
  }
});
