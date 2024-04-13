import { axiosInstance } from './axiosInstance';

//  TODO: Test with API
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

export { loginUser };
