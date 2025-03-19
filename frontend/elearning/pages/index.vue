<template>
  <LoginForm v-if="!applicationStore.isLogin" />
  <div>
    <h1>Welcome to E-Learning</h1>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/Form/Login.vue';
const applicationStore = useApplicationStore();
</script>
