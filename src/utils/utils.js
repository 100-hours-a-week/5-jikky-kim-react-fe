// 버튼 활성화, 비활성화
export const activateButton = (id) => {
    const button = document.getElementById(id);
    button.classList.add('active');
};

export const deactivateButton = (className) => {
    const button = document.getElementById(className);
    button.classList.remove('active');
};
