import {
  css,
} from './configs';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt', // Thêm Pinia vào Nuxt Modules

  ],
  css
});
