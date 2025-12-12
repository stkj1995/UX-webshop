import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';

const STORAGE_USERS = 'webshop-users';
const STORAGE_USER_EMAIL = 'webshop-user-email';

document.querySelector('#frmLogin').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = e.target.txtEmail.value.trim();
  const password = e.target.txtPassword.value.trim();

  const users = JSON.parse(localStorage.getItem(STORAGE_USERS)) || [];
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (!user) {
    alert('Wrong email or password');
    return;
  }

  localStorage.setItem(STORAGE_USER_EMAIL, email);
  window.location.href = 'products.html';
});
