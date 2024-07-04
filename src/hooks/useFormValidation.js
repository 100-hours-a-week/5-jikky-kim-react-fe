import { useState, useEffect } from 'react';
import { validateEmail, validatePassword, validateNickname, validateInput } from '../utils/validate';
import { HELPER_TEXT } from '../constants/helperText';
import { activateButton, deactivateButton, updateState } from '../utils/utils';

const useFormValidation = (user) => {
    const [helperText, setHelperText] = useState({
        profileHelper: HELPER_TEXT.PROFILE_EMPTY,
        emailHelper: '',
        passwordHelper: '',
        passwordCheckHelper: '',
        nicknameHelper: '',
    });

    const isValid =
        validateEmail(user.email) &&
        validatePassword(user.password) &&
        validateNickname(user.nickname) === true &&
        user.password === user.passwordCheck &&
        user.profile;

    useEffect(() => {
        validateInput.email(user.email, updateState, setHelperText);
        validateInput.password(user.password, updateState, setHelperText);
        validateInput.passwordCheck(user.password, user.passwordCheck, updateState, setHelperText);
        validateInput.nickname(user.nickname, updateState, setHelperText);

        if (isValid) {
            activateButton('register-btn');
        } else {
            deactivateButton('register-btn');
        }
    }, [user, isValid]);

    return { helperText, isValid, setHelperText };
};

export default useFormValidation;
