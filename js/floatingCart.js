import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';

export function renderFloatingCart() {
    const cartItemsContainer = document.getElementById('floating-cart-items');
    const cartCount = document.getElementById('floating-cart-count');
    const cartTotal = document.getElementById('floating-cart-total');

    if (!cartItemsContainer || !cartCount || !cartTotal) return;

    const email = localStorage.getItem(STORAGE_USER_EMAIL);
    let cart = [];

    if(email){
        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        cart = allCarts[email] || [];
    } else {
        cart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    }

    if(cart.length === 0){
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartCount.textContent = 0;
        cartTotal.textContent = '0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <h5>${item.title}</h5>
            <span class="price">$${item.price.toFixed(2)}</span>
            <button data-index="${index}" class="remove-btn">✖</button>
        </div>
    `).join('');

    cartCount.textContent = cart.length;
    cartTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const idx = e.target.dataset.index;
            removeFromCart(idx);
        });
    });
}

function removeFromCart(index){
    const email = localStorage.getItem(STORAGE_USER_EMAIL);

    if(email){
        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        const cart = allCarts[email] || [];
        cart.splice(index,1);
        allCarts[email] = cart;
        localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));
    } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        guestCart.splice(index,1);
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }

    renderFloatingCart();
}

document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-toggle');
    const cartDropdown = document.getElementById('cart-dropdown');
    if(cartBtn && cartDropdown){
        cartBtn.addEventListener('click', () => cartDropdown.classList.toggle('hidden'));
    }

    renderFloatingCart();
    window.addEventListener('storage', renderFloatingCart);
});
