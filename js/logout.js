import { STORAGE_USER_EMAIL } from './info.js';

const logoutBtn = document.querySelector('#btnLogout') || document.querySelector('#logout');

if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    // Remove user email only
    localStorage.removeItem(STORAGE_USER_EMAIL);

    // Cart stays in localStorage
    window.location.href = 'index.html';
  });
}
