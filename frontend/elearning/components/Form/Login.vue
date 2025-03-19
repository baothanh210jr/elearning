<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-tr from-purple-300 to-purple-500"
  >
    <div class="bg-white rounded-lg shadow-lg p-8 w-96">
      <h1 class="text-2xl font-bold text-center text-gray-700">Login</h1>

      <!-- Form -->
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="mt-4">
          <label for="email" class="text-sm text-gray-600">Email</label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            placeholder="Enter your Email"
            class="w-full mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <!-- Password -->
        <div class="mt-4">
          <label for="password" class="text-sm text-gray-600">Password</label>
          <input
            v-model="form.password"
            id="password"
            type="password"
            placeholder="Enter your Password"
            class="w-full mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <!-- Remember Me + Forgot Password -->
        <div class="flex justify-between items-center mt-4">
          <label class="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              v-model="form.rememberMe"
              class="form-checkbox h-4 w-4 text-purple-500"
            />
            <span class="ml-2">Remember me</span>
          </label>
          <a href="#" class="text-sm text-blue-500 hover:underline">Forgot password?</a>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          @click="handleLogin"
          class="w-full bg-purple-500 text-white py-2 px-4 mt-4 rounded hover:bg-purple-600"
        >
          Login
        </button>
      </form>

      <!-- Signup Link -->
      <p class="mt-4 text-sm text-center text-gray-600">
        Don't have an account?
        <a href="#" class="text-blue-500 hover:underline">Sign up</a>
      </p>

      <!-- Social Login -->
      <div class="flex items-center justify-center mt-4">
        <span class="text-gray-500 text-sm">or connect with</span>
      </div>
      <div class="flex justify-center space-x-4 mt-4">
        <button class="hover:bg-gray-100 rounded-full shadow-sm">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDuvrmEpW9km4cyQ02Hk3hEmPL5VfS-GTcVA&s"
            alt="Google Login"
            class="w-8 h-8 rounded-full"
          />
        </button>
        <button class="hover:bg-gray-100 rounded-full shadow-sm">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook Login"
            class="w-8 h-8 rounded-full"
          />
        </button>
        <button class="hover:bg-gray-100 rounded-full shadow-sm">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Login"
            class="w-8 h-8 rounded-full"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { REQUEST_METHOD } from '@/constants/ApiConstant';
import { useApplicationStore } from '@/stores/ApplicationStore';

// const applicationStore = useApplicationStore();

const form = ref({
  email: '',
  password: '',
  rememberMe: false
});

async function handleLogin() {
  const data = await $fetch('/api/login', {
    method: REQUEST_METHOD.POST,
    body: form.value
  });
}
</script>

<style>
/* You can add global styles or customize here. */
</style>
