import { renderFloatingCart } from './floatingCart.js'; 
import { STORAGE_USER_EMAIL } from './info.js';

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('#products-container');

    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${product.title}" class="product-image" />
                </div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <a href="product.html?id=${product.id}" class="view-product-btn">View Product</a>
                <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
            `;
            container.appendChild(card);
        });

        // Handle add-to-cart clicks
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

function addToCart(id, products) {
    const product = products.find(p => p.id == id);
    if(!product) return;

    const email = localStorage.getItem(STORAGE_USER_EMAIL);

    if (email) {
        const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
        const userCart = allCarts[email] || [];
        userCart.push(product);
        allCarts[email] = userCart;
        localStorage.setItem('userCarts', JSON.stringify(allCarts));
    } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        guestCart.push(product);
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }

    alert(`${product.title} added to cart`);

    // 🔹 Update floating cart immediately
    renderFloatingCart();
}
