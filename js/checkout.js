import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';

function renderCheckoutCart() {
    const container = document.getElementById('checkout-cart-items');
    if (!container) return;

    const email = localStorage.getItem(STORAGE_USER_EMAIL);
    let cart = [];

    if (email) {
        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        cart = allCarts[email] || [];
    } else {
        cart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    }

    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.title}">
            <h5>${item.title}</h5>
            <span>$${item.price.toFixed(2)}</span>
        </div>
    `).join('');

    const totalEl = document.getElementById('checkout-total');
    if (totalEl) {
        totalEl.textContent = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    }
}

document.addEventListener('DOMContentLoaded', renderCheckoutCart);
