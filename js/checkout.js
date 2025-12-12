// SUCCESS MESSAGE & EMPTY CART
const confirmBtn = document.getElementById('confirm-btn');

if (confirmBtn) {
    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent actual form submission

        // Remove previous message if exists
        const oldMsg = document.getElementById('success-msg');
        if (oldMsg) oldMsg.remove();

        // Create success message element
        const successMsg = document.createElement('div');
        successMsg.id = 'success-msg';
        successMsg.textContent = 'Purchase completed!';
        successMsg.style.position = 'fixed';
        successMsg.style.top = '20px';
        successMsg.style.left = '50%';
        successMsg.style.transform = 'translateX(-50%)';
        successMsg.style.background = '#B4F0CA';
        successMsg.style.color = '3D2F2F';
        successMsg.style.padding = '1rem 2rem';
        successMsg.style.borderRadius = '5px';
        successMsg.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        successMsg.style.zIndex = '9999';
        successMsg.style.fontWeight = 'bold';
        successMsg.style.opacity = '0';
        successMsg.style.transition = 'opacity 0.5s';

        document.body.appendChild(successMsg);

        // Fade in
        setTimeout(() => {
            successMsg.style.opacity = '1';
        }, 50);

        // Fade out and remove after 3 seconds
        setTimeout(() => {
            successMsg.style.opacity = '0';
            setTimeout(() => successMsg.remove(), 500);
        }, 3000);

        // Empty the cart for logged-in user or guest
        const email = localStorage.getItem(STORAGE_USER_EMAIL);
        if (email) {
            const allCarts = JSON.parse(localStorage.getItem(STORAGE_CARTS) || '{}');
            allCarts[email] = [];
            localStorage.setItem(STORAGE_CARTS, JSON.stringify(allCarts));
        } else {
            localStorage.setItem('guestCart', '[]');
        }

        // Reset cart count in floating cart UI
        const cartCount = document.getElementById('cart-count');
        if (cartCount) cartCount.textContent = '0';

        // Re-render checkout cart
        renderCheckoutCart();
    });
}
