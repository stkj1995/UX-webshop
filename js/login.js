import { USERS_BASE_URL, SESSION_STORAGE_USER_EMAIL } from './info.js';
import { showModal } from './modal.js';

document.querySelector('#frmLogin').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.txtEmail.value.trim();
    const password = e.target.txtPassword.value.trim();

    try {
        const res = await fetch(`${USERS_BASE_URL}/users`);
        const users = await res.json();

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showModal('Validation error', 'Incorrect credentials.');
            return;
        }

        // Store logged in user
        sessionStorage.setItem(SESSION_STORAGE_USER_EMAIL, user.email);

        // Redirect
        location.href = 'index.html';

    } catch (error) {
        console.error(error);
        showModal('Error', 'Could not connect to server.');
    }
});
