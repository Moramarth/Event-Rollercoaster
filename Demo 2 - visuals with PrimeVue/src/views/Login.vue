<script setup>
import { ref } from 'vue';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { loginUser } from '../dataProviders/auth';
import { useUsersStore } from '../store/userStore';

const userStore = useUsersStore();
const router = useRouter();

const isLoading = ref(false);
const errorLogin = ref(false);

const emailInput = ref('');
const password = ref('');

async function handleSubmit() {
  isLoading.value = true;
  const userData = {
    email: emailInput.value,
    password: password.value,
  };
  const response = await loginUser(userData);
  if (Object.keys(response).length === 0) {
    errorLogin.value = true;
    setTimeout(() => {
      errorLogin.value = false;
    }, 2000);
    isLoading.value = false;
    return;
  }
  //   TODO: Proper parameter from response
  await userStore.storeLoginUser(response.access);
  isLoading.value = false;
  if (userStore.authenticationStatus)
    router.push({ name: 'home-page' });
}
</script>

<template>
  <div class="wrapper">
    <Message :closable="false" severity="success">
      <h1>Login</h1>
      <h3>Email:  </h3>
      <h3>Password: </h3>
    </Message>
    <form action="" method="post" @submit.prevent="handleSubmit">
      <span class="p-float-label">
        <InputText id="email" v-model="emailInput" />
        <label for="email">Email</label>
      </span>

      <span class="p-float-label">
        <Password
          v-model="password"
          input-id="password"
          toggle-mask
          :feedback="false"
          :disabled="isLoading"
        />
        <label for="password">Password</label>
      </span>
      <div v-if="errorLogin" class="error-msg">
        Invalid Email or Password! Access denied!
      </div>
      <Button v-else class="btn btn-primary">
        <LoadSpinner v-if="isLoading" />
        <span v-else>Login</span>
      </Button>
    </form>
  </div>
</template>

<style  scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
}

.wrapper {
  max-width: 40em;
  margin: 0 auto;
}

.error-msg {
  color: red
}
</style>
