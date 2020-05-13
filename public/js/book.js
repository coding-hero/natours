/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId, price) => {
  const data = {
    tourId,
    price
  };
  try {
    const res = await axios.post('/api/v1/booking', data);
    if (res.data.status === 'success') {
      showAlert('success', 'Tour booked successfully!');
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
