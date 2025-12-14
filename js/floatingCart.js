import { getCart, removeFromCart } from './cartHelpers.js';

export function renderFloatingCart() {
    const cartItemsContainer = document.getElementById('floating-cart-items');
    const cartCount = document.getElementById('floating-cart-count');
    const cartTotal = document.getElementById('floating-cart-total');

    if (!cartItemsContainer || !cartCount || !cartTotal) return;

    const cart = getCart();

    if (cart.length === 0) {
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

    // Bind remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            removeFromCart(parseInt(e.target.dataset.index));
        });
    });
}

// Listen for cart updates anytime
window.addEventListener('cartUpdated', renderFloatingCart);

// Render on page load
document.addEventListener('DOMContentLoaded', renderFloatingCart);

// Optional: toggle cart dropdown
document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-toggle');
    const cartDropdown = document.getElementById('cart-dropdown');
    if(cartBtn && cartDropdown){
        cartBtn.addEventListener('click', () => cartDropdown.classList.toggle('hidden'));
    }
});
