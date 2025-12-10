export const showModal = (header, text) => {
    const modal = document.querySelector('#mdlInfo');
    modal.querySelector('h1').innerText = header;
    modal.querySelector('p').innerText = text;
    modal.showModal();
};