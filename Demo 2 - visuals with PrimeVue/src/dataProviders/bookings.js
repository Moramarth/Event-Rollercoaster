import { authHeaders } from '../utils/authValidation';
import { axiosInstance } from './axiosInstance';

async function bookTickets(bookingData) {
  try {
    const response = await axiosInstance.post('Booking', bookingData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('errorFetchingMsg', error);
    return '';
  }
}

async function payTickets(bookingId) {
  try {
    const response = await axiosInstance.post('Booking/Payment', { bookingId }, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('errorFetchingMsg', error);
    return {};
  }
}

export { bookTickets, payTickets };
