import { addToCart } from './cartHelpers.js';

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('#products-container');
    if (!container) return;

    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();

        products.forEach(product => {
            // Create star rating display
            const fullStars = Math.floor(product.rating.rate);
            const halfStar = product.rating.rate % 1 >= 0.5 ? 1 : 0;
            const emptyStars = 5 - fullStars - halfStar;

            let starsHtml = '⭐'.repeat(fullStars);
            if (halfStar) starsHtml += '✩';
            starsHtml += '☆'.repeat(emptyStars);

            // ← ORIGINAL WORKING: use div for product-card
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${product.title}" loading="lazy" />
                </div>
                <h3>${product.title}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <p class="rating">Rating: ${product.rating.rate.toFixed(1)} ${starsHtml} (${product.rating.count} reviews)</p>
                <a href="product.html?id=${product.id}">View Product</a>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            container.appendChild(card);
        });

        // ← ORIGINAL WORKING: Event delegation for dynamic buttons
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-cart');
            if (!btn) return;

            const id = btn.dataset.id;
            const product = products.find(p => p.id == id);
            if (!product) return;

            // Generate rating stars for localStorage
            const fullStars = Math.floor(product.rating.rate);
            const halfStar = product.rating.rate % 1 >= 0.5 ? 1 : 0;
            const emptyStars = 5 - fullStars - halfStar;
            let starsHtml = '⭐'.repeat(fullStars);
            if (halfStar) starsHtml += '✩';
            starsHtml += '☆'.repeat(emptyStars);

            const productToStore = { ...product, ratingStars: starsHtml, id: product.id };

            // Save in localStorage by user
            const userEmail = localStorage.getItem('webshop-user-email');
            const currentCart = JSON.parse(localStorage.getItem('webshop-carts')) || {};
            if (!currentCart[userEmail]) currentCart[userEmail] = [];
            currentCart[userEmail].push(productToStore);
            localStorage.setItem('webshop-carts', JSON.stringify(currentCart));

            // Update floating cart UI
            addToCart(productToStore);
        });

    } catch (err) {
        console.error(err);
    }
});
