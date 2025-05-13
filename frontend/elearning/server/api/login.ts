import { API_RESPONSE_STATUS_CODE } from '@/constants/ApiConstant';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  try {
    const response = await fetch(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const { data } = await response.json();

    if (response.status !== API_RESPONSE_STATUS_CODE.SUCCESS) {
      return {
        status: response.status,
        data: {
          message: data.errors?.[0].message
        }
      };
    }
    if (data.access_token) {
      const user = await fetch(`${config.public.apiBase}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.access_token}`
        }
      });
      const userData = await user.json();
      setCookie(event, 'auth_token', data.access_token, {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: data.expires
      });

      return { status: response.status, data: userData.data };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw createError({ statusCode: 500, message: 'Error occurred during login.' });
  }
});

