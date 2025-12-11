// const cartContainer = document.getElementById('cart-container');
// const totalPriceEl = document.getElementById('total-price');
// const email = localStorage.getItem('userEmail');

// function renderCart() {
//     if(!email){
//         cartContainer.innerHTML = "<p>Please log in to see your cart.</p>";
//         totalPriceEl.textContent = "0.00";
//         return;
//     }

//     const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
//     const userCart = allCarts[email] || [];

//     cartContainer.innerHTML = '';
//     let total = 0;

//     userCart.forEach((p, idx) => {
//         const div = document.createElement('div');
//         div.className = 'cart-item';
//         div.innerHTML = `
//             <span>${p.title} - $${p.price.toFixed(2)}</span>
//             <button class="remove-btn" data-idx="${idx}">Remove</button>
//         `;
//         cartContainer.appendChild(div);
//         total += p.price;
//     });

//     totalPriceEl.textContent = total.toFixed(2);

//     cartContainer.querySelectorAll('.remove-btn').forEach(btn => {
//         btn.addEventListener('click', () => {
//             const idx = btn.dataset.idx;
//             userCart.splice(idx, 1);
//             allCarts[email] = userCart;
//             localStorage.setItem('userCarts', JSON.stringify(allCarts));
//             renderCart();
//         });
//     });
// }

const cartContainer = document.getElementById('cart-container');

function renderCart() {
  if (!cartContainer) return; // Safe check

  const email = localStorage.getItem('userEmail');
  if (!email) {
    cartContainer.innerHTML = '<p>Please log in to see your cart.</p>';
    return;
  }

  const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
  const cart = allCarts[email] || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
      <p class="price">$${item.price.toFixed(2)}</p>
      <button data-index="${index}" class="remove-btn">Remove</button>
    </div>
  `
    )
    .join('');

  // Add event listeners for remove buttons
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = e.target.dataset.index;
      removeFromCart(idx);
    });
  });
}

function removeFromCart(index) {
  const email = localStorage.getItem('userEmail');
  const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
  const cart = allCarts[email] || [];

  cart.splice(index, 1);
  allCarts[email] = cart;
  localStorage.setItem('userCarts', JSON.stringify(allCarts));
  renderCart();
}

// Initialize cart render
renderCart();
