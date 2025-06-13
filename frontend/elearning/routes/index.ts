import { PAGE } from '../constants/CommonConstant';
export const routes = [
    {
        name: PAGE.HOME,
        path: '/',
        file: '@/pages/index.vue'
    },
    {
        name: PAGE.PRODUCT_DETAIL,
        path: '/hai-san/:category/:slug/:id',
        file: '@/pages/product-detail.vue'
    },
    {
        name: PAGE.CATEGORIES,
        path: '/hai-san/:category/:id',
        file: '@/pages/categories.vue'
    }
];
