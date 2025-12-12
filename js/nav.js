import { STORAGE_USER_EMAIL } from './info.js';

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const loginEl = document.querySelector('#login');
  const signupEl = document.querySelector('#signup');
  const logoutEl = document.querySelector('#logout');
  const userEl = document.querySelector('#user');
  const userEmailSpan = document.querySelector('#userEmail');
  const header = document.querySelector('header');
  const burgerBtn = document.getElementById('burger-btn');
  const mainNav = document.getElementById('main-nav');

  // Check user login state
  const updateAuthUI = () => {
    const email = localStorage.getItem(STORAGE_USER_EMAIL);
    if (email) {
      loginEl?.classList.add('hidden');
      signupEl?.classList.add('hidden');
      logoutEl?.classList.remove('hidden');
      if (userEl && userEmailSpan) {
        userEl.classList.remove('hidden');
        userEmailSpan.textContent = email;
      }
    } else {
      loginEl?.classList.remove('hidden');
      signupEl?.classList.remove('hidden');
      logoutEl?.classList.add('hidden');
      if (userEl) {
        userEl.classList.add('hidden');
        if (userEmailSpan) userEmailSpan.textContent = '';
      }
    }
  };

  updateAuthUI();

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Burger menu toggle
  burgerBtn?.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    burgerBtn.classList.toggle('open'); // For animated X
  });
});

