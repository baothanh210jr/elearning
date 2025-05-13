import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthentication = defineStore('authentication', () => {
  const isLogin = ref<boolean>(false);
  const token = ref<string | null>(null);
  const setLogin = (value: boolean) => {
    isLogin.value = value;
  };

  return {
    isLogin,
    setLogin,
    token
  };
});
