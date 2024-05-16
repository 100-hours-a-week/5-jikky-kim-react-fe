export const openModal = (modal, overlay) => {
    modal.current.style.display = 'flex';
    overlay.current.style.display = 'flex';
    document.querySelector('body').style.overflow = 'hidden';
};

export const closeModal = (modal, overlay) => {
    modal.current.style.display = 'none';
    overlay.current.style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
};
