import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';
import { renderFloatingCart } from './floatingCart.js';

const STORAGE_USERS = 'webshop-users';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#frmLogin');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = e.target.txtEmail.value.trim().toLowerCase();
        const password = e.target.txtPassword.value.trim();

        const users = JSON.parse(localStorage.getItem(STORAGE_USERS)) || [];
        const user = users.find(u => u.email.toLowerCase() === email && u.password === password);

        if (!user) {
            alert('Wrong email or password');
            return;
        }

        // Store logged-in user email
        localStorage.setItem(STORAGE_USER_EMAIL, email);

        // Optional: merge guest cart into logged-in user cart
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        if (guestCart.length > 0) {
            const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
            const userCart = allCarts[email] || [];
            allCarts[email] = [...userCart, ...guestCart];
            localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));

            // Clear guest cart
            localStorage.removeItem('guestCart');
        }

        // Update floating cart immediately
        renderFloatingCart();

        // Redirect to products page
        window.location.href = 'products.html';
    });
});

