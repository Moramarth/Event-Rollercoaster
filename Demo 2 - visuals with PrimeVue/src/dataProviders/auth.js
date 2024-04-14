import { authHeaders } from '../utils/authValidation';
import { axiosInstance } from './axiosInstance';

async function loginUser(userData) {
  try {
    const response = await axiosInstance.post('Login', userData);
    return response.data;
  }
  catch (error) {
    console.error('errorFetchingMsg', error);
    return {};
  }
}

async function checkTokenValidation() {
  try {
    const response = await axiosInstance.get('Login', {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('errorFetchingMsg', error);
    return '';
  }
}

export { loginUser, checkTokenValidation };
