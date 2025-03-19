import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthentication = defineStore('authentication', () => {
  const isLogin = ref<Boolean>(false);
  const setLogin = (value: Boolean) => {
    isLogin.value = value;
  };
  return {
    isLogin,
    setLogin
  };
});
