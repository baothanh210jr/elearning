import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/types/user';


export const useApplicationStore = defineStore('application', () => {
  const authLogin = useAuthentication()
  const user = ref<User | null>(null);
  const setUser = (value: User) => {
    user.value = value;
  };
  const cookie = useCookie('auth_token');
  const setLogout = () => {
    return new Promise<void>(resolve => setTimeout(resolve, 1000)).then(() => {
      cookie.value = null;
      user.value = null;
      authLogin.isLogin = false
      navigateTo('/');
    });
  };
  return {
    setUser,
    user,
    setLogout
  };
});
