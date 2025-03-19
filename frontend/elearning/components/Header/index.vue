<template>
  <header class="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
    <!-- Logo and Navigation -->
    <div class="flex items-center space-x-4">
      <!-- Logo -->
      <div class="text-xl font-bold cursor-pointer b b-b-green-400 b-b-opacity-50 p-2">
        <span class="text-green-400">Master</span> Developer
      </div>
      <!-- Navigation Links -->
      <nav class="hidden md:flex space-x-6">
        <a href="#" class="hover:text-green-400">Home</a>
        <a href="#" class="hover:text-green-400">Courses</a>
        <a href="#" class="hover:text-green-400">Contact</a>
      </nav>
    </div>

    <!-- Action Buttons -->
    <div v-if="!applicationStore.isLogin" class="flex items-center space-x-4">
      <!-- Login -->
      <button
        class="bg-transparent hover:bg-green-500 text-white border border-green-500 text-sm font-medium px-4 py-2 rounded-md"
      >
        Login
      </button>
      <!-- Sign Up -->
      <button
        class="bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-4 py-2 rounded-md"
      >
        Sign Up
      </button>
    </div>
    <div v-else>
      <button
        class="bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const applicationStore = useApplicationStore();
</script>
