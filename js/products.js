import { renderFloatingCart } from './floatingCart.js'; 
import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('#products-container');
    if (!container) return;

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
                const product = products.find(p => p.id == productId);
                if(product) addToCart(product);
            }
        });

    } catch (err) {
        console.error('Error fetching products:', err);
    }
});

function addToCart(product) {
    const email = localStorage.getItem(STORAGE_USER_EMAIL);

    if (email) {
        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        const cart = allCarts[email] || [];
        cart.push(product);
        allCarts[email] = cart;
        localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));
    } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        guestCart.push(product);
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }

    alert(`${product.title} added to cart`);

    renderFloatingCart();
}
