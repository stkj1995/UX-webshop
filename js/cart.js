import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';

export function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceEl = document.getElementById('total-price');
    if(!cartContainer || !totalPriceEl) return;

    const email = localStorage.getItem(STORAGE_USER_EMAIL);
    let cart = [];

    if(email){
        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        cart = allCarts[email] || [];
    } else {
        cart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    }

    if(cart.length === 0){
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceEl.textContent = '0';
        return;
    }

    let total = 0;
    cartContainer.innerHTML = cart.map((item,index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <h4>${item.title}</h4>
                <p class="price">$${item.price.toFixed(2)}</p>
                <button data-index="${index}" class="remove-btn">Remove</button>
            </div>
        `;
    }).join('');

    totalPriceEl.textContent = total.toFixed(2);

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => removeFromCart(e.target.dataset.index));
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

    renderCart();
}

document.addEventListener('DOMContentLoaded', renderCart);
