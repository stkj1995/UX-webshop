import { showModal } from './modal.js';

const STORAGE_USERS = 'webshop-users'; // key for localStorage

document.querySelector('#frmSignup').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = e.target.txtEmail.value.trim();
  const password = e.target.txtPassword.value.trim();
  const repeatPassword = e.target.txtRepeatPassword.value.trim();

  // Password match validation
  if (password !== repeatPassword) {
    showModal('Validation error', 'Both passwords must match.');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showModal('Validation error', 'Please enter a valid email.');
    return;
  }

  // Password strength validation
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
  if (!passRegex.test(password)) {
    showModal(
      'Validation error',
      'Password must be 8-20 chars, include uppercase, lowercase, number and special char.'
    );
    return;
  }

  // Load users from localStorage
  const users = JSON.parse(localStorage.getItem(STORAGE_USERS)) || [];

  // Check if email already exists
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    showModal('Validation error', 'Email is already registered.');
    return;
  }

  // Add new user
  users.push({ email, password });
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));

  showModal('Signed up', 'The new user was created successfully.');
  e.target.reset();
});
