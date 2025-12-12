import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';
import { renderFloatingCart } from './floatingCart.js';

document.querySelector('#frmCheckout')?.addEventListener('submit', e => {
    e.preventDefault();

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

    const email = localStorage.getItem(STORAGE_USER_EMAIL);

    if(email){
        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        const userCart = allCarts[email] || [];

        if(userCart.length === 0){
            alert('Your cart is empty');
            return;
        }

        allCarts[email] = [];
        localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));

    } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        if(guestCart.length === 0){
            alert('Your cart is empty');
            return;
        }

        localStorage.removeItem('guestCart');
    }

    renderFloatingCart(); // update floating cart
    alert('Order confirmed! Thank you.');
    window.location.href = 'index.html';
});
