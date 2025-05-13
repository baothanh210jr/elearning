<template>
  <aside class="sidebar ">
    <nav>
      <!-- Menu chính -->
      <ul class="menu-list">
        <li v-for="(menu, index) in menus" :key="index">
          <NuxtLink
            :to="{
              name: menu.link
            }"
            class="flex items-center gap-3"
          >
            <UIcon :name="menu.icon" class="size-5 text-black" />
            <span>{{ menu.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { PAGE } from '@/constants/CommonConstant';
const menus = ref([
  {
    icon: 'hugeicons:dashboard-circle',
    title: 'Dashboard',
    link: PAGE.DASHBOARD
  },
  {
    icon: 'material-symbols:library-books-outline-sharp',
    title: 'My Courses',
    link: PAGE.PROGRESS
  },
  {
    icon: 'material-symbols:list-alt-outline',
    title: 'Categories',
    link: PAGE.CATEGORIES
  },
  {
    icon: 'carbon:ai-status-in-progress',
    title: 'My Progress',
    link: PAGE.PROGRESS
  }
]);
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
  padding: 10px;
  margin: 0;
}

.menu-list li {
  margin-bottom: 1rem;
}

.menu-list li a {
  text-decoration: none;
  color: #646464; /* Màu xám chữ */
  font-size: 18px;
  font-weight: 500;
  padding: 10px 15px 10px 20px; /* Fixed padding syntax */
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  a {
    display: block;
  }
}

.menu-list li:hover {
  background-color: #ebebeb; /* Tô sáng khi hover */
}
</style>
