<template>
  <div class="rounded-lg shadow-lg p-8 h-full">
    <h1 class="text-2xl font-bold text-center text-gray-700">Login</h1>
    <!-- Form -->
    <UForm :validate :schema :state="form" class="space-y-4" @submit="handleLogin">
      <div
        v-if="isFailed"
        class="text-red-500 font-medium text-lg p-3 bg-red-100 rounded-lg text-center my-4"
      >
        {{ LOGIN_FAILED }}
      </div>
      <UFormField label="Email" name="email" class="text-xl" required>
        <UInput v-model="form.email" class="w-full text-xl" size="xl" />
      </UFormField>

      <UFormField label="Password" name="password" class="text-xl" required>
        <UInput v-model="form.password" type="password" class="w-full" size="xl" />
      </UFormField>
      <UButton
        loading-auto
        type="submit"
        class="w-full flex justify-center py-4 bg-primary-500 hover:bg-primary-600 text-white text-xl mt-10 cursor-pointer"
      >
        Submit
      </UButton>
    </UForm>

    <!-- Signup Link -->
    <p class="mt-4 text-sm text-center text-gray-600">
      Don't have an account?
      <ULink
        as="button"
        class="text-blue-500 font-medium cursor-pointer"
        @click="popupStore.activePopup = NAME_POPUP.SIGNUP"
        >Sign up</ULink
      >
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
</template>

<script setup lang="ts">
import { API_RESPONSE_STATUS_CODE, REQUEST_METHOD } from '@/constants/ApiConstant';
import { useApplicationStore } from '@/stores/ApplicationStore';
import * as v from 'valibot';
import type { FormErrorEvent, FormError } from '@nuxt/ui';
import {
  EMAIL_INVALID,
  PASSWORD_INVALID,
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  LOGIN_FAILED
} from '@/constants/MessageConstant';
import { NAME_POPUP } from '@/constants/CommonConstant';

const schema = v.object({
  email: v.pipe(v.string(), v.email(EMAIL_INVALID)),
  password: v.pipe(v.string(), v.minLength(6, PASSWORD_INVALID))
});

const applicationStore = useApplicationStore();
const auth = useAuthentication();
const popupStore = usePopupStore();

const form = ref({
  email: '',
  password: '',
  rememberMe: false
});

const isFailed = ref(false);

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ name: 'email', message: EMAIL_REQUIRED });
  if (!state.password) errors.push({ name: 'password', message: PASSWORD_REQUIRED });
  return errors;
};

async function handleLogin() {
  isFailed.value = false;
  const data = await fetch('/api/login', {
    method: REQUEST_METHOD.POST,
    body: JSON.stringify(form.value),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (data.status !== API_RESPONSE_STATUS_CODE.SUCCESS) {
    isFailed.value = true;
    return;
  }
  const response = await data.json();
  auth.setLogin(true);
  popupStore.closePopup();
  applicationStore.setUser(response?.data);
}
</script>

<style>
/* You can add global styles or customize here. */
</style>
