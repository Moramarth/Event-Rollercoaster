import { useUsersStore } from '../store/userStore';
import { checkTokenValidation } from '../dataProviders/auth';

function authHeaders() {
  const userStore = useUsersStore();
  return { Authorization: `Bearer ${userStore.getAccessToken}` };
}

async function validateUser() {
  const userStore = useUsersStore();
  const isLoggedIn = await checkTokenValidation();

  if (!isLoggedIn) {
    userStore.storeLogoutUser();
    return { name: 'login-page' };
  }

  return true;
};

export { authHeaders, validateUser };
