<template>
  <header
    style="height: var(--header-height)"
    class="text-black px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50 bg-primary "
  >
    <!-- Logo and Navigation -->
    <NuxtLink class="flex items-center space-x-4" to="/">
      <!-- Logo -->
      <div class="text-xl font-bold cursor-pointer b b-b-green-400 b-b-opacity-50 p-2 text-white">
        <span class="">Hải sản</span> Ngọc Duyên
      </div>
      <!-- Navigation Links -->
    </NuxtLink>
    <UInput
      icon="i-lucide-search"
      size="xl"
      variant="outline"
      placeholder="Tìm kiếm..."
      class="w-full max-w-150"
  />

    <!-- Action Buttons -->
    <div v-if="!auth.isLogin" class="flex items-center ">
      <!-- Login -->
      <UButton
        @click="popupStore.activePopup = NAME_POPUP.LOGIN"
        class="cursor-pointer font-bold"
        size="xl"
        >Đăng nhập</UButton
      >
      <!-- Sign Up -->
      <!-- <UButton
        @click="popupStore.activePopup = NAME_POPUP.SIGNUP"
        class=" cursor-pointer text-white font-bold  "
        size="xl"
        >Đăng ký</UButton
      > -->
    </div>
    <div v-else>
      <div class="flex items-center gap-5">
        <UAvatar :src="`${config.public.apiBase}/assets/${applicationStore.user?.avatar}`" />
        <UButton
          @click="handleLogout"
          loading-auto
          class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-8 py-3 rounded-md"
        >
          Đăng xuất
        </UButton>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { NAME_POPUP } from '~/constants/CommonConstant';

const config = useRuntimeConfig();

const auth = useAuthentication();
const applicationStore = useApplicationStore();
const popupStore = usePopupStore();

const handleLogout = async () => {
  auth.token = '';
  return await applicationStore.setLogout();
};
</script>
