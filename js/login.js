// import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';
// import { renderFloatingCart } from './floatingCart.js';

// const STORAGE_USERS = 'webshop-users';

// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.querySelector('#frmLogin');
//     if (!form) return;

//     form.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const email = e.target.txtEmail.value.trim().toLowerCase();
//         const password = e.target.txtPassword.value.trim();

//         const users = JSON.parse(localStorage.getItem(STORAGE_USERS)) || [];
//         const user = users.find(u => u.email.toLowerCase() === email && u.password === password);

//         if (!user) {
//             alert('Wrong email or password');
//             return;
//         }

//         localStorage.setItem(STORAGE_USER_EMAIL, email);

      
//         const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
//         if (guestCart.length > 0) {
//             const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
//             const userCart = allCarts[email] || [];
//             allCarts[email] = [...userCart, ...guestCart];
//             localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));

       
//             localStorage.removeItem('guestCart');
//         }

     
//         renderFloatingCart();

      
//         window.location.href = 'products.html';
//     });
// });

import { showModal } from './modal.js';
import { STORAGE_USER_EMAIL } from './info.js';

const STORAGE_USERS = 'webshop-users';

document.querySelector('#frmLogin')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.txtEmail.value.trim();
    const password = e.target.txtPassword.value.trim();

    let users = JSON.parse(localStorage.getItem(STORAGE_USERS)) || [];

    if (users.length === 0) {
        const data = await fetch('data/users.json').then(r => r.json());
        users = data.users;
        localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
    }

    const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
        showModal('Login failed', 'Wrong email or password.');
        return;
    }

    localStorage.setItem(STORAGE_USER_EMAIL, user.email);

    showModal('Login successful', `Welcome back, ${user.email}!`);
    e.target.reset();

    window.location.href = 'index.html';
});
