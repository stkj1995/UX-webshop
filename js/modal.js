export const showModal = (header, text) => {
    const modal = document.querySelector('#mdlInfo');
    if (!modal) return;

    modal.querySelector('h1').innerText = header;
    modal.querySelector('p').innerText = text;

    modal.showModal();

    // STEP 5 — move focus to close button (ACCESSIBILITY)
    modal.querySelector('.close')?.focus();
};

// Add close button functionality
const closeBtn = document.querySelector('#mdlInfo .close');
closeBtn?.addEventListener('click', () => {
    const modal = document.querySelector('#mdlInfo');
    modal?.close();
});

// Optional: close when clicking outside the dialog
const modal = document.querySelector('#mdlInfo');
modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
});
