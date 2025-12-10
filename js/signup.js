// import { USERS_BASE_URL } from './info.js';
// import { showModal } from './modal.js';

// document.querySelector('#frmSignup').addEventListener('submit', (e) => {
//     e.preventDefault();

//     const email = e.target.txtEmail.value.trim();
//     const password = e.target.txtPassword.value.trim();
//     const repeatPassword = e.target.txtRepeatPassword.value.trim();

//     if (password !== repeatPassword) {
//         showModal('Validation error', 'Both passwords must match.');
//         return false;
//     }

//     const newUser = {
//         email: email,
//         password: password
//     };

//     fetch(`${USERS_BASE_URL}/users`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newUser)
//     })
//     .then(response => response.json())
//     .then(data => { // eslint-disable-line no-unused-vars
//         showModal('Signed up', 'The new user was created successfully.');
//         e.target.reset();
//     })
//     .catch(error => console.log(error));
// });

import { USERS_BASE_URL } from './info.js';
import { showModal } from './modal.js';

document.querySelector('#frmSignup').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.txtEmail.value.trim();
    const password = e.target.txtPassword.value.trim();
    const repeatPassword = e.target.txtRepeatPassword.value.trim();

    // ---------- Validate passwords match ----------
    if (password !== repeatPassword) {
        showModal('Validation error', 'Both passwords must match.');
        return false;
    }

    // ---------- Validate email format ----------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showModal('Validation error', 'Please enter a valid email.');
        return false;
    }

    // ---------- Validate password strength ----------
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
    if (!passwordRegex.test(password)) {
        showModal('Validation error', 'Password must be 8-20 chars, include uppercase, lowercase, number and special char.');
        return false;
    }

    try {
        // ---------- Check if user already exists ----------
        const res = await fetch(`${USERS_BASE_URL}/users`);
        const users = await res.json();
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (existingUser) {
            showModal('Validation error', 'Email is already registered.');
            return false;
        }

        // ---------- Create new user ----------
        const newUser = {
            id: Date.now().toString(), // unique ID
            email: email,
            password: password
        };

        const createRes = await fetch(`${USERS_BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        const data = await createRes.json();
        showModal('Signed up', 'The new user was created successfully.');
        e.target.reset();

    } catch (error) {
        console.error(error);
        showModal('Error', 'Something went wrong. Please try again.');
    }
});
