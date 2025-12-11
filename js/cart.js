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

// renderCart();

// js/cart.js
const cartContainer = document.getElementById('cart-container');
const totalEl = document.getElementById('total-price');

function renderCart(){
  const email = localStorage.getItem('userEmail');
  if(!email){
    cartContainer.innerHTML = '<p>Please log in to see your cart.</p>';
    totalEl.textContent = '0.00';
    return;
  }
  const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
  const cart = allCarts[email] || [];
  cartContainer.innerHTML = '';

  let total = 0;
  cart.forEach((p, idx) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span class="title">${p.title}</span>
      <span class="price">$${p.price.toFixed(2)}</span>
      <button class="remove" data-idx="${idx}">Remove</button>
    `;
    cartContainer.appendChild(div);
    total += Number(p.price);
  });

  totalEl.textContent = total.toFixed(2);

  cartContainer.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = Number(e.target.dataset.idx);
      cart.splice(idx,1);
      allCarts[email] = cart;
      localStorage.setItem('userCarts', JSON.stringify(allCarts));
      renderCart();
    });
  });
}

renderCart();
