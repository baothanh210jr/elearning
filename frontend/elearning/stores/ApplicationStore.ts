import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { User } from '@/types/user';

export const useApplicationStore = defineStore('application', () => {
  const isLogin = ref<Boolean>(false);
  const user = ref<User | null>(null);
  const setLogin = (value: Boolean) => {
    isLogin.value = value;
  };
  const setUser = (value: User) => {
    user.value = value;
  };
  return {
    isLogin,
    setLogin,
    setUser,
    user
  };
});
