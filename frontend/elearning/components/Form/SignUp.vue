<template>
  <div class="rounded-lg shadow-lg p-8 h-full">
    <h1 class="text-2xl font-bold text-center text-gray-700 mb-10">Sign Up</h1>
    <!-- Form -->
    <UForm
      ref="formRef"
      :validate
      :schema="schema"
      :state="form"
      class="space-y-4"
      @submit="handleSignUp"
    >
      <div
        v-if="message && (isFailed || isSuccess)"
        :class="{
          'text-red-500 bg-red-100': isFailed,
          'text-green-500 bg-green-100': isSuccess
        }"
        class="font-medium text-lg p-3 rounded-lg text-center my-4"
      >
        {{ message }}
      </div>
      <div class="flex gap-4">
        <UFormField label="First name" name="first_name" class="text-xl w-full">
          <UInput v-model="form.first_name" class="w-full text-xl" size="xl" />
        </UFormField>
        <UFormField label="Last name" name="last_name" class="text-xl w-full">
          <UInput v-model="form.last_name" class="w-full text-xl" size="xl" />
        </UFormField>
      </div>
      <UFormField label="Email" name="email" class="text-xl" required>
        <UInput v-model="form.email" class="w-full text-xl" size="xl" />
      </UFormField>
      <UFormField label="Password" name="password" class="text-xl" required>
        <UInput v-model="form.password" type="password" class="w-full" size="xl" />
      </UFormField>
      <UFormField label="Confirm password" name="confirm_password" class="text-xl" required>
        <UInput v-model="confirmPassword" type="password" class="w-full" size="xl" />
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
      You have an account?
      <ULink
        as="button"
        @click="popupStore.activePopup = NAME_POPUP.LOGIN"
        class="text-blue-500 font-medium cursor-pointer"
        >Login</ULink
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
import * as v from 'valibot';
import type { FormError } from '@nuxt/ui';
import {
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  PASSWORD_INVALID,
  PASSWORD_REQUIRED,
  SIGNUP_SUCCESS
} from '@/constants/MessageConstant';
import { NAME_POPUP } from '~/constants/CommonConstant';

const popupStore = usePopupStore();

const confirmPassword = ref('');

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: ''
});

const schema = v.object({
  email: v.pipe(v.string(), v.email(EMAIL_INVALID)),
  password: v.pipe(v.string(), v.minLength(8, PASSWORD_INVALID))
});

const isFailed = ref(false);
const isSuccess = ref(false);
const message = ref('');

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ name: 'email', message: EMAIL_REQUIRED });
  if (!state.password) errors.push({ name: 'password', message: PASSWORD_REQUIRED });
  return errors;
};

async function handleSignUp() {
  isFailed.value = false;
  isSuccess.value = false;
  const data = await fetch('/api/signup', {
    method: REQUEST_METHOD.POST,
    body: JSON.stringify(form.value),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await data.json();
  if (response.status === API_RESPONSE_STATUS_CODE.SUCCESS) {
    isSuccess.value = true;
    message.value = SIGNUP_SUCCESS;
  } else {
    isFailed.value = true;
    message.value = response.data.message;
  }
}
</script>

<style>
/* You can add global styles or customize here. */
</style>
