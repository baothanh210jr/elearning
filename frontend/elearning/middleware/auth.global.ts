import { API_RESPONSE_STATUS_CODE } from '@/constants/ApiConstant';
import { useApplicationStore } from '@/stores/ApplicationStore';

export default defineNuxtRouteMiddleware(async (to: any, from:any) => {
  const config = useRuntimeConfig()

  // setData('previous-url', to.path);
  const authStore = useAuthentication();
  const application = useApplicationStore();
  const token = useCookie('auth_token').value; 
 
  authStore.setLogin(!!token);
  authStore.token = token || '';
  // application.showLogin = !token;

  if (!token) { 
    return
  }

  const user = await fetch(`${config.public.apiBase}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });



  if (user.status === API_RESPONSE_STATUS_CODE.SUCCESS) {
    const userData = await user.json();
    application.setUser(userData.data);
  } 
});
