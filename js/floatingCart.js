import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';

document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.getElementById('cart-toggle');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Toggle dropdown
    cartBtn.addEventListener('click', () => {
        cartDropdown.classList.toggle('hidden');
    });

    function renderFloatingCart(){
        const email = localStorage.getItem(STORAGE_USER_EMAIL);
        if(!email){
            cartItemsContainer.innerHTML = '<p>Please log in.</p>';
            cartCount.textContent = 0;
            cartTotal.textContent = '0.00';
            return;
        }

        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        const cart = allCarts[email] || [];

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

        // Remove item
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const idx = e.target.dataset.index;
                removeFromCart(idx);
            });
        });
    }

    function removeFromCart(index){
        const email = localStorage.getItem(STORAGE_USER_EMAIL);
        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        const cart = allCarts[email] || [];
        cart.splice(index, 1);
        allCarts[email] = cart;
        localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));
        renderFloatingCart();
    }

    renderFloatingCart();
    window.addEventListener('storage', renderFloatingCart);
});
