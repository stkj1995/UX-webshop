// import { USERS_BASE_URL } from './info.js';
// import { showModal } from './modal.js';

// document.querySelector('#frmSignup').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const email = e.target.txtEmail.value.trim();
//     const password = e.target.txtPassword.value.trim();
//     const repeatPassword = e.target.txtRepeatPassword.value.trim();

//     if (password !== repeatPassword) {
//         showModal('Validation error', 'Both passwords must match.');
//         return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         showModal('Validation error', 'Please enter a valid email.');
//         return false;
//     }

//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
//     if (!passwordRegex.test(password)) {
//         showModal('Validation error', 'Password must be 8-20 chars, include uppercase, lowercase, number and special char.');
//         return false;
//     }

//     try {
//         const res = await fetch(`${USERS_BASE_URL}/users`);
//         const users = await res.json();
//         const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

//         if (existingUser) {
//             showModal('Validation error', 'Email is already registered.');
//             return false;
//         }

//         const newUser = {
//             id: Date.now().toString(), 
//             email: email,
//             password: password
//         };

//         const createRes = await fetch(`${USERS_BASE_URL}/users`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(newUser)
//         });

//         const data = await createRes.json();
//         showModal('Signed up', 'The new user was created successfully.');
//         e.target.reset();

//     } catch (error) {
//         console.error(error);
//         showModal('Error', 'Something went wrong. Please try again.');
//     }
// });

// js/signup.js
import { USERS_BASE_URL } from './info.js';
import { showModal } from './modal.js'; // beholder din modal

document.querySelector('#frmSignup').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.txtEmail.value.trim();
  const password = e.target.txtPassword.value.trim();
  const repeatPassword = e.target.txtRepeatPassword.value.trim();

  if(password !== repeatPassword){
    showModal('Validation error','Both passwords must match.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    showModal('Validation error','Please enter a valid email.');
    return;
  }

  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
  if(!passRegex.test(password)){
    showModal('Validation error','Password must be 8-20 chars, include uppercase, lowercase, number and special char.');
    return;
  }

  try {
    const res = await fetch(`${USERS_BASE_URL}/users`);
    const users = await res.json();
    if(users.find(u => u.email.toLowerCase() === email.toLowerCase())){
      showModal('Validation error','Email is already registered.');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password
    };

    const createRes = await fetch(`${USERS_BASE_URL}/users`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(newUser)
    });

    if(!createRes.ok) throw new Error('Could not create user');

    showModal('Signed up','The new user was created successfully.');
    e.target.reset();

  } catch (err) {
    console.error(err);
    showModal('Error','Something went wrong. Try again.');
  }
});
