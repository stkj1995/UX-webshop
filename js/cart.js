// function getCart() {
//     return JSON.parse(localStorage.getItem("cart")) || [];
// }

// function saveCart(cart) {
//     localStorage.setItem("cart", JSON.stringify(cart));
// }

// async function addToCart(productId) {
//     let cart = getCart();

//     const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
//     const product = await res.json();

//     const existing = cart.find(item => item.id === product.id);

//     if (existing) {
//         existing.quantity += 1;
//     } else {
//         cart.push({
//             id: product.id,
//             title: product.title,
//             price: product.price,
//             image: product.image,
//             quantity: 1
//         });
//     }

//     saveCart(cart);
//     alert("Added to cart!");
// }

// const cartContainer = document.getElementById("cart-container");
// const totalContainer = document.getElementById("total-price");

// function renderCart() {
//     if (!cartContainer) return;

//     const cart = getCart();
//     cartContainer.innerHTML = "";

//     if (cart.length === 0) {
//         cartContainer.innerHTML = "<p>Your cart is empty.</p>";
//         totalContainer.innerHTML = "0";
//         return;
//     }

//     cart.forEach(item => {
//         const div = document.createElement("div");
//         div.classList.add("cart-item");

//         div.innerHTML = `
//             <img src="${item.image}" alt="">
//             <h3>${item.title}</h3>
//             <p>$${item.price}</p>
//             <p>Qty: ${item.quantity}</p>

//             <button onclick="removeFromCart(${item.id})">Remove</button>
//         `;

//         cartContainer.appendChild(div);
//     });

//     const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     totalContainer.innerHTML = total.toFixed(2);
// }

// function removeFromCart(id) {
//     let cart = getCart();
//     cart = cart.filter(item => item.id !== id);
//     saveCart(cart);
//     renderCart();
// }

// renderCart();

// js/cart.js
const cartContainer = document.getElementById('cart-container');
const totalPriceEl = document.getElementById('total-price');
const email = localStorage.getItem('userEmail');

function renderCart() {
    if(!email){
        cartContainer.innerHTML = "<p>Please log in to see your cart.</p>";
        totalPriceEl.textContent = "0.00";
        return;
    }

    const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    const userCart = allCarts[email] || [];

    cartContainer.innerHTML = '';
    let total = 0;

    userCart.forEach((p, idx) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${p.title} - $${p.price.toFixed(2)}</span>
            <button class="remove-btn" data-idx="${idx}">Remove</button>
        `;
        cartContainer.appendChild(div);
        total += p.price;
    });

    totalPriceEl.textContent = total.toFixed(2);

    // Remove product from cart
    cartContainer.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = btn.dataset.idx;
            userCart.splice(idx, 1);
            allCarts[email] = userCart;
            localStorage.setItem('userCarts', JSON.stringify(allCarts));
            renderCart();
        });
    });
}

renderCart();
