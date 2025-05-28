<template>
  <aside class="sidebar">
    <nav>
      <!-- Menu chính -->
      <ul class="menu-list divide-y divide-black">
        <li v-for="(menu, index) in categories?.data" :key="index">
          <NuxtLink
            :to="{
              name: PAGE.COURSE_DETAIL,
              params: { slug: convertToSlug(menu.name), id: menu.id }
            }"
            class="flex items-center gap-3"
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
import type { Category } from '@/types/category';



const fetchCategories = async (): Promise<{ data: Category[]; totalCount: number }> => {
  const response = await $fetch<{ data: Category[]; totalCount: number }>(`/api/categories`, {
    method: 'GET',
    query: {
      meta: 'total_count'
    }
  });
  return response;
}

const {
  data: categories,
  status,
  error,
  refresh
} = useAsyncData<{ data: Category[]; totalCount: number }>('fetchCategories', () => fetchCategories());


</script>

<style scoped>
/* CSS cho Sidebar */
.sidebar {
  position: fixed;
  top: calc(var(--header-height));
  left: 0;
  height: 100vh;
  width: 300px;
  color: #ffffff; /* Màu chữ trắng */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-header {
  margin-bottom: 2rem;
}

.new-post-btn {
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6; /* Màu xanh lam */
  color: black;
  border: none;
  border-radius: 0.5rem;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.menu-list {
  list-style: none;
  margin: 0;

}

.menu-list li {

}

.menu-list li a {
  text-decoration: none;
  color: #646464; /* Màu xám chữ */
  font-size: 18px;
  font-weight: 500;
  padding: 15px 15px 15px 20px; /* Fixed padding syntax */
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  a {
    display: block;
  }
}

.menu-list li:hover {
}
</style>
