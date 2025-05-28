import { API_RESPONSE_STATUS_CODE, ERROR_CODES } from '@/constants/ApiConstant';
import { EMAIL_EXISTED } from '@/constants/MessageConstant';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  try {
    const response = await fetch(`${config.public.apiBase}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie':`directus_session_token=${config.public.adminToken}`
        },
        body: JSON.stringify({
            ...body,
        })
    });

    const data = await response.json();
    if(response.status !== API_RESPONSE_STATUS_CODE.SUCCESS) {
        const message = data.errors?.[0].extensions.code === ERROR_CODES.RECORD_NOT_UNIQUE ? EMAIL_EXISTED : data.errors?.[0].message;
        return {
            status: response.status,
            data: {
                message
            }
        }
    }
    return { status: API_RESPONSE_STATUS_CODE.SUCCESS, data };
  } catch (error) {
    console.error('An error occurred:', error);
    throw createError({ statusCode: 500, message: `${error}` });
  }
});

