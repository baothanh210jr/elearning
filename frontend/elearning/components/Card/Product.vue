<template>
    <UCard class="min-h-80 max-h-100 flex flex-col shadow-md hover:bg-white">
        <!-- Hình ảnh mô tả (thumbnail) -->

        <USkeleton v-if="product.statusPending" class="h-40 w-full" />
        <nuxt-link
            v-else
            :to="{
                name: 'product-detail',
                params: {
                    id: product.id,
                    category: convertToSlug(product.category_id?.name),
                    slug: convertToSlug(product?.name)
                }
            }"
        >
            <div class="aspect-1/1 cursor-pointer overflow-hidden rounded-lg my-5">
                <img
                    :src="`${config.public.apiBase}/assets/${product.thumbnail}`"
                    alt="Article thumbnail"
                    class="w-full h-full object-cover hover:scale-105 transition-transform"
                />
            </div>
        </nuxt-link>
        <!-- Title -->
        <nuxt-link
            :to="{
                name: 'product-detail',
                params: {
                    id: product.id,
                    category: convertToSlug(product.category_id.name),
                    slug: convertToSlug(product.name)
                }
            }"
            class="cursor-pointer hover:underline"
        >
            <span v-if="!product.statusPending" class="text-lg font-semibold line-clamp-2">{{
                product.name
            }}</span>
            <USkeleton v-else class="h-10 w-full" />
        </nuxt-link>
        <div class="flex flex-col gap-2 h-full">
            <!-- Pricing -->
            <div class="flex items-center gap-2">
                <span
                    v-if="!product.statusPending && product.price"
                    class="text-lg font-semibold text-primary-500"
                >
                    {{ product.price?.toLocaleString() }}đ
                </span>
                <span
                    v-if="!product.statusPending && product.discount"
                    class="text-sm text-gray-500 line-through"
                >
                    {{ product.discount.toLocaleString() }}đ
                </span>
            </div>
            <!-- Datetime -->
            <div class="flex flex-col gap-2 mt-auto">
                <div class="flex items-center text-gray-500 text-sm">
                    <USkeleton v-if="product.statusPending" class="h-4 w-full" />
                    <!-- <span v-else>{{ formattedDate }} </span> -->
                </div>
            </div>
        </div>
    </UCard>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/product';
import { convertToSlug } from '@/utils/String';

const config = useRuntimeConfig();
const props = defineProps<{
    product: Product;
}>();

// const datetime = new Date(props.product.created_at);
// const formattedDate = datetime.toLocaleDateString();
const applicationStore = useApplicationStore();
</script>
