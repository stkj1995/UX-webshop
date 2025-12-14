import { getCart, removeFromCart } from './cartHelpers.js';

export function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceEl = document.getElementById('total-price');
    if(!cartContainer || !totalPriceEl) return;

    const cart = getCart();

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
        btn.addEventListener('click', e => {
            removeFromCart(parseInt(e.target.dataset.index));
            renderCart();
        });
    });
}

document.addEventListener('DOMContentLoaded', renderCart);
