import { clearCart } from './cartHelpers.js';

const confirmBtn = document.getElementById('confirm-btn');

if (confirmBtn) {
    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Success message
        const oldMsg = document.getElementById('success-msg');
        if (oldMsg) oldMsg.remove();

        const successMsg = document.createElement('div');
        successMsg.id = 'success-msg';
        successMsg.textContent = 'Purchase completed!';
        Object.assign(successMsg.style, {
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
        document.body.appendChild(successMsg);
        setTimeout(() => successMsg.style.opacity = '1', 50);
        setTimeout(() => {
            successMsg.style.opacity = '0';
            setTimeout(() => successMsg.remove(), 500);
        }, 3000);

        // Clear cart
        clearCart();

        // Reset floating cart count
        const cartCount = document.getElementById('cart-count');
        if (cartCount) cartCount.textContent = '0';

        // Re-render cart if function exists
        if (typeof renderCheckoutCart === 'function') renderCheckoutCart();
    });
}
