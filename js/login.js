import { USERS_BASE_URL, STORAGE_USER_EMAIL } from './info.js';

document.querySelector('#frmLogin').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.txtEmail.value.trim();
  const password = e.target.txtPassword.value.trim();

  try {
    // fetch user by email
    const res = await fetch(`${USERS_BASE_URL}/users?email=${encodeURIComponent(email)}`);

    if (!res.ok) throw new Error('Users fetch failed');
    const users = await res.json();
    const user = users.find(u => u.password === password);

    if (!user) {
      alert('Wrong email or password');
      return;
    }

    // store email
    localStorage.setItem(STORAGE_USER_EMAIL, email);

    // redirect
    window.location.href = 'products.html';

  } catch(err) {
    console.error(err);
    alert('Login error');
  }
});
