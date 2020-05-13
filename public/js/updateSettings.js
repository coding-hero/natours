/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const updateSettings = async (data, type) => {
  const url =
    type === 'data'
      ? '/api/v1/users/updateMe'
      : '/api/v1/users/updatePassword';
  try {
    const res = await axios.patch(url, data);
    if (res.data.status === 'success') {
      showAlert('success', `${type} successfully updated`);
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
