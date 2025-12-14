// import { STORAGE_USER_EMAIL } from './info.js';


// export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// export const isValidPassword = (pw) => {
//   return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/.test(pw);
// }


// export async function signup(email, password) {
//   if (!isValidEmail(email) || !isValidPassword(password)) {
//     throw new Error('Validation failed');
//   }

//   const res = await fetch('http://localhost:3000/users', {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({email, password})
//   });
//   if (!res.ok) throw new Error('Could not create user');
//   return res.json();
// }

// export async function login(email, password) {
//   const res = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
//   const users = await res.json();
//   const user = users.find(u => u.password === password);
//   if (!user) throw new Error('Invalid credentials');
  

//   localStorage.setItem(STORAGE_USER_EMAIL, email);
//   return user;
// }
