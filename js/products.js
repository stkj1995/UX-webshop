import { addToCart } from './cartHelpers.js';

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
                    <img src="${product.image}" alt="${product.title}" />
                </div>
                <h3>${product.title}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <a href="product.html?id=${product.id}">View Product</a>
                <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
            `;
            container.appendChild(card);
        });

        // Handle Add to Cart clicks
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const id = e.target.dataset.id;
                const product = products.find(p => p.id == id);
                if (product) {
                    addToCart(product); // dispatches cartUpdated
                }
            }
        });

    } catch (err) {
        console.error(err);
    }
});
