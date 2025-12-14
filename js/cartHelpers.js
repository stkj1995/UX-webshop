import { STORAGE_USER_EMAIL, STORAGE_CARTS } from './info.js';

/* -------------------------
   GET CART (guest / user)
-------------------------- */
export function getCart() {
    const email = localStorage.getItem(STORAGE_USER_EMAIL);

    if (email) {
        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        return allCarts[email] || [];
    }

    return JSON.parse(localStorage.getItem('guestCart') || '[]');
}

/* -------------------------
   REMOVE ITEM
-------------------------- */
export function removeFromCart(index) {
    const email = localStorage.getItem(STORAGE_USER_EMAIL);

    if (email) {
        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        const cart = allCarts[email] || [];
        cart.splice(index, 1);
        allCarts[email] = cart;
        localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));
    } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        guestCart.splice(index, 1);
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }

    // 🔔 notify UI
    window.dispatchEvent(new Event('cartUpdated'));
}

/* -------------------------
   CLEAR CART (checkout)
-------------------------- */
export function clearCart() {
    const email = localStorage.getItem(STORAGE_USER_EMAIL);

    if (email) {
        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        allCarts[email] = [];
        localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));
    } else {
        localStorage.setItem('guestCart', '[]');
    }

    // 🔔 notify UI
    window.dispatchEvent(new Event('cartUpdated'));
}

export function addToCart(product) {
    const email = localStorage.getItem(STORAGE_USER_EMAIL);

    if (email) {
        const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
        const cart = allCarts[email] || [];
        cart.push(product);
        allCarts[email] = cart;
        localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));
    } else {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        guestCart.push(product);
        localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }

    // 🔔 notify floating cart
    window.dispatchEvent(new Event('cartUpdated'));

    // ✅ show "added to cart" message
    const msg = document.createElement('div');
    msg.textContent = `${product.title} added to cart!`;
    Object.assign(msg.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#B4F0CA',
        color: '#3D2F2F',
        padding: '1rem 2rem',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: '9999',
        fontWeight: 'bold',
        opacity: '0',
        transition: 'opacity 0.5s',
    });
    document.body.appendChild(msg);

    // fade in/out animation
    setTimeout(() => msg.style.opacity = '1', 50);
    setTimeout(() => {
        msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 500);
    }, 2000);
}
