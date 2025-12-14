// async function loadHTML(id, file) {
//     const res = await fetch(file);
//     const html = await res.text();
//     document.getElementById(id).innerHTML = html;
// }

// async function init() {
//     await loadHTML("header", "components/header.html");
//     await loadHTML("footer", "components/footer.html");
// }

// init();


// async function loadHTML(id, file) {
//     const res = await fetch(file);
//     const html = await res.text();
//     document.getElementById(id).innerHTML = html;
// }

// async function init() {
//     await loadHTML("header", "components/header.html");
//     await loadHTML("footer", "components/footer.html");

   
//     await import("./nav.js");
//     await import("./loginCheck.js");
//     await import("./logout.js");
// }

// init();

async function loadHTML(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

async function init() {
    await loadHTML("header", "components/header.html");
    await loadHTML("footer", "components/footer.html");

    // Wait for DOM elements in header to exist
    const burgerBtn = document.getElementById('burger-btn');
    const mainNav = document.getElementById('main-nav');

    if (burgerBtn && mainNav) {
        burgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            burgerBtn.classList.toggle('open'); // animated X
        });
    }

    // Header-dependent scripts
    await import("./nav.js");
    await import("./loginCheck.js");
    await import("./logout.js");
}

init();
