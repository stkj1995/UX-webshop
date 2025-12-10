// fetch("https://fakestoreapi.com/products")
//   .then(res => res.json())
//   .then(data => {
//     console.log("Products loaded:", data);
//   })
//   .catch(err => console.error("API fetch error:", err));

// import { BASE_URL } from './info.js';

// document.addEventListener("DOMContentLoaded", async () => {
//     const container = document.querySelector('#products-container');

//     const res = await fetch(`${BASE_URL}/products`);
//     const products = await res.json();

//     container.innerHTML = products.map(product => `
//         <article class="product-card">
//             <img src="${product.image}" alt="${product.title}">
//             <h3>${product.title}</h3>
//             <p>${product.category}</p>
//             <strong>${product.price} $</strong>
//         </article>
//     `).join('');
// });


// const productsURL = 'https://fakestoreapi.com/products';

// const productsContainer = document.getElementById('products-container');

// async function fetchProducts() {
//     try {
//         const response = await fetch(productsURL);
//         const products = await response.json();

//         console.log(products); 

//         renderProducts(products);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     }
// }

// function renderProducts(products) {
//     productsContainer.innerHTML = ''; 
//     products.forEach(product => {
//         const productCard = document.createElement('div');
//         productCard.classList.add('product-card');
//         productCard.innerHTML = `
//             <img src="${product.image}" alt="${product.title}">
//             <h3>${product.title}</h3>
//             <p>${product.description}</p>
//             <strong>$${product.price}</strong>
//             <button onclick="addToCart(${product.id})">Add to Cart</button>
//         `;
//         productsContainer.appendChild(productCard);
//     });
// }

// fetchProducts();

// js/products.js
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('#products-container');

    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();

        products.forEach(p => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <img src="${p.image}" alt="${p.title}" class="product-image" />
                <h3 class="product-title">${p.title}</h3>
                <p class="product-price">$${p.price.toFixed(2)}</p>
                <a href="product.html?id=${p.id}" class="view-product-btn">View Product</a>
                <button data-id="${p.id}" class="add-to-cart">Add to Cart</button>
            `;
            container.appendChild(card);
        });

        // Add event listener for all "Add to Cart" buttons
        container.addEventListener('click', (e) => {
            if(e.target.classList.contains('add-to-cart')){
                const productId = e.target.dataset.id;
                addToCart(productId, products);
            }
        });

    } catch (err) {
        console.error('Error fetching products:', err);
    }
});

// ---------- Add to cart per logged-in user ----------
function addToCart(id, products) {
    const email = localStorage.getItem('userEmail');
    if(!email){
        alert('You must be logged in to add products to cart!');
        return;
    }

    const product = products.find(p => p.id == id);
    if(!product) return;

    // Retrieve the user-specific cart from localStorage
    const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    const userCart = allCarts[email] || [];

    userCart.push(product);
    allCarts[email] = userCart;
    localStorage.setItem('userCarts', JSON.stringify(allCarts));

    alert(`${product.title} added to your cart!`);
}
