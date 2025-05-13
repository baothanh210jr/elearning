<template>
  <main>
    <Header />
    <div class="flex pl-75">
      <SidebarDesktop />
      <UContainer class="w-full py-10">
        <div style="margin-top: var(--header-height)" class="min-h-screen w-full">
          <slot />
        </div>
      </UContainer>
    </div>
    <UModal
      :open="popupStore.activePopup === NAME_POPUP.LOGIN"
      @update:open="popupStore.closePopup"
      class="max-w-2xl h-auto"
    >
      <template #content><LoginForm /></template>
    </UModal>
    <UModal
      :open="popupStore.activePopup === NAME_POPUP.SIGNUP"
      @update:open="popupStore.closePopup"
      class="max-w-2xl h-auto"
    >
      <template #content><SignUpForm /></template>
    </UModal>
  </main>
</template>
<script setup lang="ts">
import Header from '@/components/Header/index.vue';
import LoginForm from '@/components/Form/Login.vue';
import SignUpForm from '@/components/Form/SignUp.vue';
import SidebarDesktop from '@/components/Sidebar/SidebarDesktop.vue';
import { NAME_POPUP } from '@/constants/CommonConstant';

const popupStore = usePopupStore();
</script>
