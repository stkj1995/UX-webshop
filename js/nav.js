import { STORAGE_USER_EMAIL } from './info.js';

document.addEventListener('DOMContentLoaded', () => {
  const userEmail = localStorage.getItem(STORAGE_USER_EMAIL);

  const loginEl = document.querySelector('#login');
  const signupEl = document.querySelector('#signup');
  const logoutEl = document.querySelector('#logout');
  const userEl = document.querySelector('#user');
  const userEmailSpan = document.querySelector('#userEmail');

  const header = document.querySelector('header');

  if(userEmail){
    loginEl.classList.add('hidden');
    signupEl.classList.add('hidden');
    logoutEl.classList.remove('hidden');
    if(userEl && userEmailSpan){
      userEl.classList.remove('hidden');
      userEmailSpan.textContent = userEmail;
    }
  } else {
    loginEl.classList.remove('hidden');
    signupEl.classList.remove('hidden');
    logoutEl.classList.add('hidden');
    if(userEl){
      userEl.classList.add('hidden');
      if(userEmailSpan) userEmailSpan.textContent = '';
    }
  }

  // sticky header scroll
  window.addEventListener('scroll', () => {
    if(window.scrollY > 20){
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});

