import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUsersStore = defineStore('users', () => {
  const accessToken = ref('');
  const isAuthenticated = ref(false);

  const getAccessToken = computed(() => accessToken.value);
  const getAuthStatus = computed(() => isAuthenticated.value);

  function storeLoginUser(access) {
    accessToken.value = access;
    localStorage.setItem('accessToken', access);
    isAuthenticated.value = true;
  }

  function getPersistedAuth() {
    const access = localStorage.getItem('accessToken');
    if (!access)
      return;
    accessToken.value = access;
    isAuthenticated.value = true;
  }

  function storeLogoutUser() {
    accessToken.value = null;
    localStorage.removeItem('accessToken');
  }

  return {
    getAuthStatus,
    getAccessToken,
    storeLoginUser,
    getPersistedAuth,
    storeLogoutUser,
  };
});
