import { useRef } from 'react';
import { updateState } from '../utils/utils';
import { HELPER_TEXT } from '../constants/helperText';

const useFileInput = (setUser, setHelperText) => {
    const imageInput = useRef();
    const preview = useRef();

    const fileInputHandler = (event) => {
        const file = event.target.files[0];
        if (event.target.files && file) {
            const reader = new FileReader();
            reader.onload = (event) => (preview.current.src = event.target.result);
            reader.readAsDataURL(file);

            imageInput.current.style.display = 'none';
            preview.current.style.display = 'block';

            updateState('profile', file.name, setUser);
            updateState('profileHelper', '', setHelperText);

            // preview에 input click 연결
            preview.current.addEventListener('click', function () {
                event.target.click();
            });
        } else {
            imageInput.current.style.display = 'block';
            preview.current.style.display = 'none';
            preview.current.src = '';
            updateState('profile', '', setUser);
            updateState('profileHelper', HELPER_TEXT.PROFILE_EMPTY, setHelperText);
        }
    };

    return { imageInput, preview, fileInputHandler };
};

export default useFileInput;
