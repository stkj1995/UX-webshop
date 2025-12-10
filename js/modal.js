export const showModal = (header, text) => {
    const modal = document.querySelector('#infoModal');
    modal.querySelector('h1').innerText = header;
    modal.querySelector('p').innerText = text;
    modal.showModal();
};
