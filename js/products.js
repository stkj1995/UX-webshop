// URL to fetch all products
const productsURL = 'https://fakestoreapi.com/products';

// Container in HTML to render products
const productsContainer = document.getElementById('products-container');

async function fetchProducts() {
    try {
        const response = await fetch(productsURL);
        const products = await response.json();

        console.log(products); // check the data in console

        // Render products
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function renderProducts(products) {
    productsContainer.innerHTML = ''; // clear container
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <strong>$${product.price}</strong>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Call fetch on page load
fetchProducts();
