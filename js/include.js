import { STORAGE_USER_EMAIL } from './info.js';

async function loadHTML(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(file);
  el.innerHTML = await res.text();
}

function initAuth() {
  const signupBtn = document.getElementById("signup");
  const loginBtn = document.getElementById("login");
  const logoutBtn = document.getElementById("logout");
  const userEl = document.getElementById("user");
  const userEmailEl = document.getElementById("userEmail");

  if (!signupBtn || !loginBtn || !logoutBtn || !userEl) return;

  const email = localStorage.getItem(STORAGE_USER_EMAIL);

  if (email) {
    signupBtn.classList.add("hidden");
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    userEl.classList.remove("hidden");
    userEmailEl.textContent = email;
  } else {
    signupBtn.classList.remove("hidden");
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    userEl.classList.add("hidden");
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_USER_EMAIL);
    location.reload();
  });
}

function initBurgerMenu() {
  const header = document.querySelector('header');
  const burgerBtn = document.getElementById('burger-btn');
  const mainNav = document.getElementById('main-nav');

  if (!burgerBtn || !mainNav || !header) return;

  // Sticky header
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Burger menu toggle
  burgerBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('active');
    burgerBtn.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', isOpen);
  });
}

async function init() {
  await loadHTML("header", "components/header.html");
  await loadHTML("footer", "components/footer.html");

  // Run auth logic **after header is loaded**
  initAuth();

  // Init burger menu **after header is loaded**
  initBurgerMenu();
}

init();
