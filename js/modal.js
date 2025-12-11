export const showModal = (header, text) => {
    const modal = document.querySelector('#mdlInfo');
    if (!modal) return;

    modal.querySelector('h1').innerText = header;
    modal.querySelector('p').innerText = text;

    modal.showModal();
};
