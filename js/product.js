// SINGLE PRODUCT PAGE

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const singleProductContainer = document.getElementById("single-product");

async function fetchSingleProduct() {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();

        renderSingleProduct(product);
    } catch (err) {
        console.error("Error loading single product:", err);
        singleProductContainer.innerHTML = "<p>Could not load product.</p>";
    }
}

function renderSingleProduct(product) {
    singleProductContainer.innerHTML = `
        <div class="single-product-card">
            <img src="${product.image}" alt="${product.title}">

            <div class="info">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <strong>$${product.price}</strong>

                <button onclick="addToCart(${product.id})" class="add-btn">
                    Add to Cart
                </button>
                <a href="index.html" class="back-link">← Back</a>
            </div>
        </div>
    `;
}

fetchSingleProduct();
