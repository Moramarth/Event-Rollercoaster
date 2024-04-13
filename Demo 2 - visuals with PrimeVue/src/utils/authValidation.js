import { useUsersStore } from '../store/userStore';

function authHeaders() {
  const userStore = useUsersStore();
  return { Authorization: `Bearer ${userStore.getAccessToken}` };
}

export { authHeaders };
