import { renderFloatingCart } from './floatingCart.js'; 
import { STORAGE_USER_EMAIL } from './info.js';

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const container = document.getElementById('single-product');

async function init() {
  if (!productId) {
    container.innerHTML = '<p>Product not found</p>';
    return;
  }

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await res.json();
    render(product);
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p>Could not load product</p>';
  }
}

function render(product) {
  container.innerHTML = `
    <article class="single-product-card">
      <img src="${product.image}" alt="${product.title}" loading="lazy">
      <div class="info">
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button id="addBtn">Add to cart</button>
        <a href="products.html">← Back</a>
      </div>
    </article>
  `;

  document.getElementById('addBtn').addEventListener('click', () => addToCart(product));
}

function addToCart(product) {
  const email = localStorage.getItem(STORAGE_USER_EMAIL);

  if (email) {
    const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
    const cart = allCarts[email] || [];
    cart.push(product);
    allCarts[email] = cart;
    localStorage.setItem('userCarts', JSON.stringify(allCarts));
  } else {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    guestCart.push(product);
    localStorage.setItem('guestCart', JSON.stringify(guestCart));
  }

  alert(`${product.title} added to cart`);

  // Update floating cart immediately
  renderFloatingCart();
}

init();
