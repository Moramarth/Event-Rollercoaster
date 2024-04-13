import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https:/192.168.10.37:7160/api/',
});
