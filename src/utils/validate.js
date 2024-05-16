import { HELPER_TEXT } from '../constants/helperText';
import api from './api';

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

const duplicateNickname = async (nickname) => {
    const isDuplicate = await api.get('/users/nickname/check', { nickname });
    if (isDuplicate.isExist) {
        return 'NICKNAME_DUPLICATE';
    }
    return true;
};
const duplicateEmail = async (email) => {
    const isDuplicate = await api.get('/users/email/check', { email });
    if (isDuplicate.isExist) {
        return 'EMAIL_DUPLICATE';
    }
    return true;
};

export const validateInput = {
    email: async (email, setState, setHelperText) => {
        if (email === '') return setState('emailHelper', HELPER_TEXT.EMAIL_EMPTY, setHelperText);
        if (validateEmail(email)) {
            let isDuplicate = await duplicateEmail(email);
            if (isDuplicate !== true) {
                return setState('emailHelper', HELPER_TEXT[isDuplicate], setHelperText);
            }
            return setState('emailHelper', '', setHelperText);
        }
        setState('emailHelper', HELPER_TEXT.EMAIL_VALIDATION_FALSE, setHelperText);
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
                : setState('passwordCheckHelper', HELPER_TEXT.PASSWORD_NOT_SAME, setHelperText);
        }
    },
    nickname: async (nickname, setState, setHelperText) => {
        if (nickname === '') setState('nicknameHelper', HELPER_TEXT.NICKNAME_EMPTY, setHelperText);
        else {
            // TODO : 중복 검사
            let isDuplicate = await duplicateNickname(nickname);
            let isValidate = validateNickname(nickname);
            if (isValidate === true) {
                if (isDuplicate !== true) {
                    return setState('nicknameHelper', HELPER_TEXT[isDuplicate], setHelperText);
                }
                setState('nicknameHelper', '', setHelperText);
                return true;
            }
            return setState('nicknameHelper', HELPER_TEXT[isValidate], setHelperText);
        }
    },
};
