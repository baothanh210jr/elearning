import { useApplicationStore } from '~/stores/ApplicationStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Lấy token từ cookie thông qua useCookie
  const applicationStore = useApplicationStore();
  const token = useCookie('auth_token').value; // 'auth_token' là nơi bạn lưu JWT token (sửa theo tên cookie thực tế)
  if (!token && to.path !== '/') {
    return navigateTo('/');
  }
  applicationStore.setLogin(!!token);
});
