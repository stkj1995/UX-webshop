import { SESSION_STORAGE_USER_EMAIL } from './info.js';

const logoutBtn = document.querySelector('#btnLogout') || document.querySelector('#logout');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem(SESSION_STORAGE_USER_EMAIL);

        // Redirect user after logout
        location.href = 'index.html';
    });
}
