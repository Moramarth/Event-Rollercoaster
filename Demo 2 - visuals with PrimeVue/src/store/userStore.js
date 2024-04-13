import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUsersStore = defineStore('users', () => {
  const accessToken = ref(null);
  const isAuthenticated = ref(false);

  const getAccessToken = computed(() => accessToken.value);
  const authenticationStatus = computed(() => isAuthenticated.value);

  async function storeLoginUser(access) {
    accessToken.value = access;
    localStorage.setItem('accessToken', accessToken.value);
    await getPersistedAuth();
  }

  async function getPersistedAuth() {
    const access = localStorage.getItem('accessToken');
    if (!access)
      return;
    isAuthenticated.value = true;
  }

  function storeLogoutUser() {
    accessToken.value = null;
    localStorage.removeItem('accessToken');
  }

  return {
    authenticationStatus,
    getAccessToken,
    storeLoginUser,
    getPersistedAuth,
    storeLogoutUser,
  };
});
