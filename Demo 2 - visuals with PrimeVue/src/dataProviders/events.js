import { authHeaders } from '../utils/authValidation';
import { axiosInstance } from './axiosInstance';

async function getEvents() {
  try {
    const response = await axiosInstance.get('Concert', {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('errorFetchingMsg', error);
    return [];
  }
}

async function getEventById(id) {
  try {
    const response = await axiosInstance.get(`Concert/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('errorFetchingMsg', error);
    return {};
  }
}
async function getUpcomingEvents() {
  try {
    const response = await axiosInstance.get('Concert/Upcoming', {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('errorFetchingMsg', error);
    return [];
  }
}

export { getUpcomingEvents, getEventById, getEvents };
