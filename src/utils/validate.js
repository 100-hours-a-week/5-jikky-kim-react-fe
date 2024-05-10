import { HELPER_TEXT } from '../constants/helperText';

export const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// 이메일 유효성 검증
export const validateEmail = (email) => {
    if (email === '') return false;
    return emailPattern.test(email);
};

// 비밀번호 유효성 검증
export const validatePassword = (password) => {
    if (password === '') return false;
    return passwordPattern.test(password);
};

// 닉네임 유효성 검증
export const validateNickname = (nickname) => {
    // 띄어쓰기가 없는지 확인
    if (nickname.indexOf(' ') !== -1) return 'NICKNAME_VALIDATION_FALSE_SPACE';
    // 길이가 10글자 이하인지 확인
    if (nickname.length > 10) return 'NICKNAME_VALIDATION_FALSE_LENGTH';
    if (nickname.length === 0) return 'NICKNAME_EMPTY';
    return true;
};

const duplicateNickname = (nickname) => {};

export const validateInput = {
    email: (email, setState, setHelperText) => {
        if (email === '') setState('emailHelper', HELPER_TEXT.EMAIL_EMPTY, setHelperText);
        else {
            // TODO : 중복 검사
            validateEmail(email)
                ? setState('emailHelper', '', setHelperText)
                : setState('emailHelper', HELPER_TEXT.EMAIL_VALIDATION_FALSE, setHelperText);
        }
    },
    password: (password, setState, setHelperText) => {
        if (password === '') setState('passwordHelper', HELPER_TEXT.PASSWORD_EMPTY, setHelperText);
        else {
            validatePassword(password)
                ? setState('passwordHelper', '', setHelperText)
                : setState('passwordHelper', HELPER_TEXT.PASSWORD_VALIDATION_FALSE, setHelperText);
        }
    },
    passwordCheck: (password, passwordCheck, setState, setHelperText) => {
        if (passwordCheck === '') setState('passwordCheckHelper', HELPER_TEXT.PASSWORD_CHECK_EMPTY, setHelperText);
        else {
            password === passwordCheck
                ? setState('passwordCheckHelper', '', setHelperText)
                : setState('passwordCheckHelper', '비밀번호가 다릅니다.', setHelperText);
        }
    },
    nickname: (nickname, setState, setHelperText) => {
        if (nickname === '') setState('nicknameHelper', HELPER_TEXT.NICKNAME_EMPTY, setHelperText);
        else {
            // TODO : 중복 검사
            // let isDuplicate = isDuplicateNickname(nickname);
            let isValidate = validateNickname(nickname);
            isValidate === true
                ? setState('nicknameHelper', '', setHelperText)
                : setState('nicknameHelper', HELPER_TEXT[isValidate], setHelperText);
        }
    },
};
