import { STORAGE_USER_EMAIL } from './info.js';

async function loadHTML(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(file);
    el.innerHTML = await res.text();
}

async function initAuth() {
    const signupBtn = document.getElementById("signup");
    const loginBtn = document.getElementById("login");
    const logoutBtn = document.getElementById("logout");
    const userEl = document.getElementById("user");
    const userEmailEl = document.getElementById("userEmail");

    if (!signupBtn || !loginBtn || !logoutBtn || !userEl) return;

    const email = localStorage.getItem(STORAGE_USER_EMAIL);

    if (email) {
        // Logged in
        signupBtn.classList.add("hidden");
        loginBtn.classList.add("hidden");
        logoutBtn.classList.remove("hidden");
        userEl.classList.remove("hidden");
        userEmailEl.textContent = email;
    } else {
        // Guest
        signupBtn.classList.remove("hidden");
        loginBtn.classList.remove("hidden");
        logoutBtn.classList.add("hidden");
        userEl.classList.add("hidden");
    }

    // Logout button behavior
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem(STORAGE_USER_EMAIL);
        location.reload(); // reload to refresh nav
    });
}

async function init() {
    await loadHTML("header", "components/header.html");
    await loadHTML("footer", "components/footer.html");

    // Run auth logic **after header is loaded**
    initAuth();
}

init();
