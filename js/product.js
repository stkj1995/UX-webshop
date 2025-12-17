// import { addToCart } from './cartHelpers.js';

// const params = new URLSearchParams(window.location.search);
// const productId = params.get('id');
// const container = document.getElementById('single-product');

// async function init() {
//   if (!productId) {
//     container.innerHTML = '<p>Product not found</p>';
//     return;
//   }

//   try {
//     const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
//     const product = await res.json();
//     render(product);
//   } catch (err) {
//     console.error(err);
//     container.innerHTML = '<p>Could not load product</p>';
//   }
// }

// function render(product) {
//   container.innerHTML = `
//     <article class="single-product-card">
//       <img src="${product.image}" alt="${product.title}" loading="lazy">
//       <div class="info">
//         <h1>${product.title}</h1>
//         <p>${product.description}</p>
//         <p class="price">$${product.price.toFixed(2)}</p>
//         <button id="addBtn">Add to cart</button>
//         <a href="products.html">← Back</a>
//       </div>
//     </article>
//   `;

//   document
//     .getElementById('addBtn')
//     .addEventListener('click', () => addToCart(product));
// }

// init();

import { addToCart } from './cartHelpers.js';

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
  // Create star rating display
  const fullStars = Math.floor(product.rating.rate);
  const halfStar = product.rating.rate % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  let starsHtml = '⭐'.repeat(fullStars);
  if (halfStar) starsHtml += '✩';
  starsHtml += '☆'.repeat(emptyStars);

  container.innerHTML = `
    <article class="single-product-card">
      <img src="${product.image}" alt="${product.title}" loading="lazy">
      <div class="info">
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p class="rating">Rating: ${product.rating.rate.toFixed(1)} ${starsHtml} (${product.rating.count} reviews)</p>
        <button id="addBtn">Add to cart</button>
        <a href="products.html">← Back</a>
      </div>
    </article>
  `;

  document
    .getElementById('addBtn')
    .addEventListener('click', () => {
      // Clone product and include id + ratingStars for localStorage
      const productToStore = { ...product, ratingStars: starsHtml, id: product.id };
      addToCart(productToStore);
    });
}

init();
