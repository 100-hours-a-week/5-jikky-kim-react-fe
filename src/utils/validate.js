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
    return true;
};
