import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';

const cartContainer = document.getElementById('cart-container');

function renderCart(){
  if(!cartContainer) return;

  const email = localStorage.getItem(STORAGE_USER_EMAIL);
  if(!email){
    cartContainer.innerHTML = '<p>Please log in to see your cart.</p>';
    return;
  }

  const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
  const cart = allCarts[email] || [];

  if(cart.length === 0){
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cartContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
      <p class="price">$${item.price.toFixed(2)}</p>
      <button data-index="${index}" class="remove-btn">Remove</button>
    </div>
  `).join('');

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => removeFromCart(e.target.dataset.index));
  });
}

function removeFromCart(index){
  const email = localStorage.getItem(STORAGE_USER_EMAIL);
  const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
  const cart = allCarts[email] || [];

  cart.splice(index, 1);
  allCarts[email] = cart;
  localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));
  renderCart();
}

// Initialize cart
renderCart();
