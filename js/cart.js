// LocalStorage keys
const STORAGE_USER_EMAIL = 'userEmail';
const STORAGE_CARTS = 'userCarts';

const cartContainer = document.getElementById('cart-container');

function renderCart() {
  const email = localStorage.getItem(STORAGE_USER_EMAIL);

  // Decide which cart to show
  let cart = [];
  if (email) {
    const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
    cart = allCarts[email] || [];
  } else {
    cart = JSON.parse(localStorage.getItem('guestCart') || '[]');
  }

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('total-price').textContent = '0';
    return;
  }

  let total = 0;
  cartContainer.innerHTML = cart.map((item, index) => {
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

  document.getElementById('total-price').textContent = total.toFixed(2);

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => removeFromCart(e.target.dataset.index));
  });
}

function removeFromCart(index) {
  const email = localStorage.getItem(STORAGE_USER_EMAIL);

  if (email) {
    const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
    const cart = allCarts[email] || [];
    cart.splice(index, 1);
    allCarts[email] = cart;
    localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));
  } else {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    guestCart.splice(index, 1);
    localStorage.setItem('guestCart', JSON.stringify(guestCart));
  }

  renderCart();
}

// Call renderCart() on page load
document.addEventListener('DOMContentLoaded', renderCart);
