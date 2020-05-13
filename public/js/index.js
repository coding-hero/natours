/* eslint-disable */

import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

const loginForm = document.querySelector('.form--login');
const signUpForm = document.querySelector('.form--signup');
const dataForm = document.querySelector('.form-user-data');
const passwordForm = document.querySelector('.form-user-password');
const map = document.querySelector('#map');
const logoutBtn = document.querySelector('.nav__el--logout');
const bookBtn = document.querySelector('#book-tour');

if (map) {
  const locations = JSON.parse(
    document.querySelector('#map').dataset.locations
  );
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    login(email, password);
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.querySelector('#fullName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#passwordConfirm').value;
    document.querySelector('#signupBtn').textContent = 'processing...';
    await signup(name, email, password, passwordConfirm);
    document.querySelector('#signupBtn').textContent = 'Sign up';
  });
}

if (dataForm) {
  dataForm.addEventListener('submit', async e => {
    e.preventDefault();
    const form = new FormData();
    form.append('email', document.querySelector('#email').value);
    form.append('name', document.querySelector('#name').value);
    form.append('photo', document.querySelector('#photo').files[0]);
    // console.log('form :', ...form);
    document.querySelector('.saveDataBtn').textContent = 'updating...';
    await updateSettings(form, 'data');
    document.querySelector('.saveDataBtn').textContent = 'Save settings';
  });
}

if (passwordForm) {
  passwordForm.addEventListener('submit', async e => {
    e.preventDefault();
    const currentPassword = document.querySelector('#password-current').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#password-confirm').value;
    document.querySelector('.savePassBtn').textContent = 'updating...';
    await updateSettings(
      { currentPassword, password, passwordConfirm },
      'password'
    );
    document.querySelector('.savePassBtn').textContent = 'Save password';

    document.querySelector('#password-current').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#password-confirm').value = '';
  });
}

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = bookBtn.dataset;
    // const price = bookBtn.dataset.price;
    bookTour(tourId);
  });

if (logoutBtn) logoutBtn.addEventListener('click', logout);
