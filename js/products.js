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
    const email = localStorage.getItem('userEmail');
    if(!email){
        alert('You must be logged in to add products to cart!');
        return;
    }

    const product = products.find(p => p.id == id);
    if(!product) return;

    const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    const userCart = allCarts[email] || [];

    userCart.push(product);
    allCarts[email] = userCart;
    localStorage.setItem('userCarts', JSON.stringify(allCarts));

    alert(`${product.title} added to your cart!`);
}

