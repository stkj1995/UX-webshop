document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const burgerBtn = document.getElementById('burger-btn');
  const mainNav = document.getElementById('main-nav');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Burger menu toggle
  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('active'); // show/hide nav
      burgerBtn.classList.toggle('open', isOpen);        // animate burger
      burgerBtn.setAttribute('aria-expanded', isOpen);   // accessibility
    });
  }
});
