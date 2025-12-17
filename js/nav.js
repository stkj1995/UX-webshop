// document.addEventListener('DOMContentLoaded', () => {
//   const header = document.querySelector('header');
//   const burgerBtn = document.getElementById('burger-btn');
//   const mainNav = document.getElementById('main-nav');

 
//   window.addEventListener('scroll', () => {
//     header.classList.toggle('scrolled', window.scrollY > 20);
//   });

  
//   if (burgerBtn && mainNav) {
//     burgerBtn.addEventListener('click', () => {
//       const isOpen = mainNav.classList.toggle('active'); // show/hide nav
//       burgerBtn.classList.toggle('open', isOpen);        // animate burger
//       burgerBtn.setAttribute('aria-expanded', isOpen);   // accessibility
//     });
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const burgerBtn = document.getElementById('burger-btn');
  const mainNav = document.getElementById('main-nav');
  const btnLogout = document.getElementById('btnLogout');

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

  // Logout functionality
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      // get current logged-in user email
      const currentUserEmail = localStorage.getItem('currentUser');

      if (currentUserEmail) {
        // remove user-specific data
        localStorage.removeItem(currentUserEmail);
        // remove currentUser itself
        localStorage.removeItem('currentUser');
      }

      // Update UI
      document.getElementById('user').classList.add('hidden');
      document.getElementById('logout').classList.add('hidden');
      document.getElementById('login').classList.remove('hidden');
      document.getElementById('signup').classList.remove('hidden');

      // Optional: redirect to home page
      window.location.href = 'index.html';
    });
  }
});
