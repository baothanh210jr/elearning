<template>
    <aside class="lg:px-4">
        <nav class="text-black">
            <!-- Menu chính -->
            <ul class="flex justify-center items-center gap-4">
                <li v-for="(menu, index) in items" :key="index">
                    <!-- <pre>{{ items?.data }}</pre> -->
                    <NuxtLink
                        :to="{
                            name: PAGE.CATEGORIES,
                            params: {
                                category: convertToSlug(menu.name),
                                id: menu.id
                            }
                        }"
                        class="flex items-center gap-3 text-sm text-primary-200 font-medium hover:text-primary hover:font-semibold transition-colors duration-300"
                    >
                        <!-- <UIcon :name="menu.icon" class="size-5 text-black" /> -->
                        <span>{{ menu.name }}</span>
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { PAGE } from '@/constants/CommonConstant';
import { useCategoriesStore } from '@/stores/Categories';
const { items } = useCategoriesStore();
</script>
