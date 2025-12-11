import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';

document.querySelector('#checkoutForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = localStorage.getItem(STORAGE_USER_EMAIL);
  if(!email){
    alert('Please login');
    return;
  }

  const delivery = e.target.delivery.value.trim();
  const billing = e.target.billing.value.trim();
  const card = e.target.card.value.trim();

  if(!delivery || !billing || !card){
    alert('Please fill all fields');
    return;
  }

  if(!/^\d{12,19}$/.test(card.replace(/\s/g,''))){
    alert('Enter a valid card number (digits only)');
    return;
  }

  const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
  allCarts[email] = [];
  localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));

  alert('Order confirmed! Thank you.');
  window.location.href = 'index.html';
});
