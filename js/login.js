import { USERS_BASE_URL, STORAGE_USER_EMAIL } from './info.js';

document.querySelector('#frmLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.txtEmail.value.trim();
  const password = e.target.txtPassword.value.trim();

  try {
    const res = await fetch(`${USERS_BASE_URL}/users`);
    if (!res.ok) throw new Error('Users fetch failed');
    const users = await res.json();

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      alert('Wrong email or password');
      return;
    }

    // Save email in localStorage
    localStorage.setItem(STORAGE_USER_EMAIL, user.email);

    // Redirect to products
    window.location.href = 'products.html';
  } catch (err) {
    console.error(err);
    alert('Login error');
  }
});
