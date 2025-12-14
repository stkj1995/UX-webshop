import { STORAGE_USER_EMAIL } from './info.js';

async function loadHTML(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(file);
    el.innerHTML = await res.text();
}

async function init() {
    await loadHTML("header", "components/header.html");
    await loadHTML("footer", "components/footer.html");

    // ===== AUTH BUTTONS =====
    const signupBtn = document.getElementById("signup");
    const loginBtn = document.getElementById("login");
    const logoutBtn = document.getElementById("logout");

    if (!signupBtn || !loginBtn || !logoutBtn) return;

    const email = localStorage.getItem(STORAGE_USER_EMAIL);

    if (email) {
        signupBtn.classList.add("hidden");
        loginBtn.classList.add("hidden");
        logoutBtn.classList.remove("hidden");
    } else {
        signupBtn.classList.remove("hidden");
        loginBtn.classList.remove("hidden");
        logoutBtn.classList.add("hidden");
    }
}

init();
