import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/types/user';

export const usePopupStore = defineStore('popupManager', () => {
    const activePopup = ref(''); // activePopup is a string
    const closePopup = () => {
        activePopup.value = '';
    }

  return {
    activePopup,
    closePopup
  };
});
