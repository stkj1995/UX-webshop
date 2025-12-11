// js/product.js
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const container = document.getElementById('single-product');

async function init(){
  if(!productId){
    container.innerHTML = '<p>Product not found</p>';
    return;
  }
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const p = await res.json();
    render(p);
  } catch(err){
    console.error(err);
    container.innerHTML = '<p>Could not load product</p>';
  }
}

function render(p){
  container.innerHTML = `
    <article class="single-product-card">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <div class="info">
        <h1>${p.title}</h1>
        <p>${p.description}</p>
        <p class="price">$${p.price.toFixed(2)}</p>
        <button id="addBtn">Add to cart</button>
        <a href="products.html">← Back</a>
      </div>
    </article>
  `;
  document.getElementById('addBtn').addEventListener('click', () => addToCart(p));
}

function addToCart(product){
  const email = localStorage.getItem('userEmail');
  if(!email){ alert('Please login'); return; }
  const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
  const cart = allCarts[email] || [];
  cart.push(product);
  allCarts[email] = cart;
  localStorage.setItem('userCarts', JSON.stringify(allCarts));
  alert(`${product.title} added to cart`);
}

init();

