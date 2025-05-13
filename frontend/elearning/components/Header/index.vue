<template>
  <header
    style="height: var(--header-height)"
    class="text-black px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50 "
  >
    <!-- Logo and Navigation -->
    <NuxtLink class="flex items-center space-x-4" to="/">
      <!-- Logo -->
      <div class="text-xl font-bold cursor-pointer b b-b-green-400 b-b-opacity-50 p-2">
        <span class="text-blue-500">Master</span> Developer
      </div>
      <!-- Navigation Links -->
    </NuxtLink>
    <UInput
      icon="i-lucide-search"
      size="xl"
      variant="outline"
      placeholder="Search..."
      class="w-full max-w-150"
  />

    <!-- Action Buttons -->
    <div v-if="!auth.isLogin" class="flex items-center space-x-4">
      <!-- Login -->
      <UButton
        @click="popupStore.activePopup = NAME_POPUP.LOGIN"
        variant="outline"
        class="px-6 cursor-pointer font-bold"
        size="xl"
        >Login</UButton
      >
      <!-- Sign Up -->
      <UButton
        @click="popupStore.activePopup = NAME_POPUP.SIGNUP"
        class="px-6 cursor-pointer text-white font-bold bg-secondary-500 hover:bg-secondary-600"
        size="xl"
        color="success"
        >Sign Up</UButton
      >
    </div>
    <div v-else>
      <div class="flex items-center gap-5">
        <UAvatar :src="`${config.public.apiBase}/assets/${applicationStore.user?.avatar}`" />
        <UButton
          @click="handleLogout"
          loading-auto
          class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-8 py-3 rounded-md"
        >
          Logout
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
