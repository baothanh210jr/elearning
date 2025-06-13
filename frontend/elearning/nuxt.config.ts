import { css } from './configs';
import { routes } from './routes';
export default defineNuxtConfig({
    compatibilityDate: '2025-03-20',

    devtools: { enabled: true },
    modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxt/ui'],
    css,
    ui: {
        colorMode: false,
        theme: {}
    },
    runtimeConfig: {
        // Biến công khai, có thể truy cập trên cả client và server
        public: {
            apiBase: process.env.API_URL || 'http://localhost:8055',
            adminToken: process.env.ADMIN_ACCESS_TOKEN || ''
        }
    },
    hooks: {
        'pages:extend'(pages) {
            pages.push(...routes);
        }
    }
});
