/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const signup = async (name, email, password, passwordConfirm) => {
  const data = {
    name,
    email,
    password,
    passwordConfirm
  };
  try {
    const res = await axios.post('/api/v1/users/signup', data);
    if (res.data.status === 'success') {
      showAlert('success', 'Registered successfully!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
