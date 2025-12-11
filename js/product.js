// const params = new URLSearchParams(window.location.search);
// const productId = params.get("id");
// const singleProductContainer = document.getElementById("single-product");

// async function fetchSingleProduct() {
//     try {
//         const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
//         const product = await response.json();
//         renderSingleProduct(product);
//     } catch (err) {
//         console.error("Error loading single product:", err);
//         singleProductContainer.innerHTML = "<p>Could not load product.</p>";
//     }
// }

// function renderSingleProduct(product) {
//     singleProductContainer.innerHTML = `
//         <div class="single-product-card">
//             <img src="${product.image}" alt="${product.title}">
//             <div class="info">
//                 <h2>${product.title}</h2>
//                 <p>${product.description}</p>
//                 <strong>$${product.price}</strong>

//                 <button id="add-to-cart-btn" class="add-btn">Add to Cart</button>
//                 <a href="products.html" class="back-link">← Back</a>
//             </div>
//         </div>
//     `;

//     const addBtn = document.getElementById('add-to-cart-btn');
//     addBtn.addEventListener('click', () => addToCart(product));
// }

// function addToCart(product){
//     const email = localStorage.getItem('userEmail');
//     if(!email){
//         alert('You must be logged in to add products to cart!');
//         return;
//     }

//     const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
//     const userCart = allCarts[email] || [];

//     userCart.push(product);
//     allCarts[email] = userCart;
//     localStorage.setItem('userCarts', JSON.stringify(allCarts));

//     alert(`${product.title} added to your cart!`);
// }

// fetchSingleProduct();

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
