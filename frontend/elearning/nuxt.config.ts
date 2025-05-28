import {
  css,
} from './configs';
import type { NuxtPage } from '@nuxt/schema'
import { createResolver } from '@nuxt/kit'
import { PAGE } from './constants/CommonConstant';
export default defineNuxtConfig({
  compatibilityDate: '2025-03-20',

  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/ui',

  ],
  css,
  ui: {
    colorMode: false,
    theme: {
    }
  },
  runtimeConfig: {
    // Biến công khai, có thể truy cập trên cả client và server
    public: {
      apiBase: process.env.API_URL || 'http://localhost:8055',
      adminToken: process.env.ADMIN_ACCESS_TOKEN || '',
    }
  },
  hooks: {
    'pages:extend' (pages) {
      pages.push(
        {
          name: PAGE.HOME,
          path:'/',
          file: '@/pages/index.vue',
        },
        {
          name: PAGE.COURSE_DETAIL,
          path: '/hai-san/:slug/:id',
          file: '@/pages/product-detail.vue',
        },
    )
    }
  }
  
});
