// import { USERS_BASE_URL, SESSION_STORAGE_USER_EMAIL } from './info.js';
// import { showModal } from './modal.js';

// document.querySelector('#frmLogin').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const email = e.target.txtEmail.value.trim();
//     const password = e.target.txtPassword.value.trim();

//     try {
//         const res = await fetch(`${USERS_BASE_URL}/users`);
//         const users = await res.json();

//         const user = users.find(u => u.email === email && u.password === password);

//         if (!user) {
//             showModal('Validation error', 'Incorrect credentials.');
//             return;
//         }

//         sessionStorage.setItem(SESSION_STORAGE_USER_EMAIL, user.email);

//         location.href = 'index.html';

//     } catch (error) {
//         console.error(error);
//         showModal('Error', 'Could not connect to server.');
//     }
// });

// js/login.js
import { USERS_BASE_URL } from './info.js';

document.querySelector('#frmLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.txtEmail.value.trim();
  const password = e.target.txtPassword.value.trim();

  try {
    const res = await fetch(`${USERS_BASE_URL}/users`);
    if(!res.ok) throw new Error('Users fetch failed');
    const users = await res.json();

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if(!user){
      alert('Wrong email or password');
      return;
    }

    localStorage.setItem('userEmail', user.email);
    // Optionelt gem user id: localStorage.setItem('userId', user.id)
    // Redirect to products:
    window.location.href = 'products.html';
  } catch (err) {
    console.error(err);
    alert('Login error');
  }
});
