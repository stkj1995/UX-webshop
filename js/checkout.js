// js/checkout.js
document.querySelector('#checkoutForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = localStorage.getItem('userEmail');
  if(!email){ alert('Please login'); return; }

  const delivery = e.target.delivery.value.trim();
  const billing = e.target.billing.value.trim();
  const card = e.target.card.value.trim();

  if(!delivery || !billing || !card){
    alert('Please fill all fields');
    return;
  }
  // Simple card check (only length)
  if(!/^\d{12,19}$/.test(card.replace(/\s/g,''))){
    alert('Enter a valid card number (digits only)');
    return;
  }

  // Clear cart for current user
  const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
  allCarts[email] = [];
  localStorage.setItem('userCarts', JSON.stringify(allCarts));

  // Show success
  alert('Order confirmed! Thank you.');
  window.location.href = 'index.html';
});
