import './Register.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validateNickname } from '../utils/validate';
import { HELPER_TEXT } from '../constants/helperText';
import { activateButton, deactivateButton, updateState, handleInputChange } from '../utils/utils';

import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

export default function Register() {
    const history = useNavigate();
    // input
    const [user, setUser] = useState({
        profile: '',
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
    });

    // helper-text
    const [helperText, setHelperText] = useState({
        profileHelper: HELPER_TEXT.PROFILE_EMPTY,
        emailHelper: '',
        passwordHelper: '',
        passwordCheckHelper: '',
        nicknameHelper: '',
    });

    useEffect(() => {
        // email 검증
        if (user.email === '') updateState('emailHelper', HELPER_TEXT.EMAIL_EMPTY, setHelperText);
        else {
            // TODO : 중복 검사
            validateEmail(user.email)
                ? updateState('emailHelper', '', setHelperText)
                : updateState('emailHelper', HELPER_TEXT.EMAIL_VALIDATION_FALSE, setHelperText);
        }

        // password 검증
        if (user.password === '') updateState('passwordHelper', HELPER_TEXT.PASSWORD_EMPTY, setHelperText);
        else {
            validatePassword(user.password)
                ? updateState('passwordHelper', '', setHelperText)
                : updateState('passwordHelper', HELPER_TEXT.PASSWORD_VALIDATION_FALSE, setHelperText);
        }

        // passwordCheck 검증
        if (user.passwordCheck === '')
            updateState('passwordCheckHelper', HELPER_TEXT.PASSWORD_CHECK_EMPTY, setHelperText);
        else {
            user.password === user.passwordCheck
                ? updateState('passwordCheckHelper', '', setHelperText)
                : updateState('passwordCheckHelper', '비밀번호가 다릅니다.', setHelperText);
        }

        // nickname 검증
        if (user.nickname === '') updateState('nicknameHelper', HELPER_TEXT.NICKNAME_EMPTY, setHelperText);
        else {
            // TODO : 중복 검사
            let validateResult = validateNickname(user.nickname);
            validateResult === true
                ? updateState('nicknameHelper', '', setHelperText)
                : updateState('nicknameHelper', HELPER_TEXT[validateResult], setHelperText);
        }
        if (
            validateEmail(user.email) &&
            validatePassword(user.password) &&
            user.password === user.passwordCheck &&
            user.nickname.length > 0 &&
            validateNickname(user.nickname) === true &&
            user.profile
        ) {
            return activateButton('register-btn');
        }
        deactivateButton('register-btn');
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            validateEmail(user.email) &&
            validatePassword(user.password) &&
            validateNickname(user.nickname) === true &&
            user.profile
        ) {
            // TODO: FORM 제출
            history('/login');
        }
    };

    const fileInputHandler = async (event) => {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                document.getElementById('preview').src = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
            document.getElementById('image-input').style.display = 'none';
            document.getElementById('preview').style.display = 'block';
            updateState('profile', event.target.files[0].name, setUser);
            updateState('profileHelper', '', setHelperText);
            // preview에 input click 연결
            document.getElementById('preview').addEventListener('click', function () {
                event.target.click();
            });
        } else {
            document.getElementById('image-input').style.display = 'block';
            document.getElementById('preview').style.display = 'none';
            document.getElementById('preview').src = '';
            updateState('profile', '', setUser);
            updateState('profileHelper', HELPER_TEXT.PROFILE_EMPTY, setHelperText);
        }
    };

    return (
        <main>
            <div className='page-title'>회원가입</div>
            <div className='flex'>
                <form id='register-form'>
                    <div className='label'>프로필 사진</div>
                    <div className='helper-text'>{helperText.profileHelper}</div>
                    <div className='flex'>
                        <label id='image-input' htmlFor='profile'>
                            <div id='add-icon'>+</div>
                        </label>
                    </div>

                    <div className='flex'>
                        <img id='preview' alt='profile image' />
                    </div>
                    <Input type='file' name='avatar' id='profile' accept='image/*' onChange={fileInputHandler} />
                    <label htmlFor='email' className='label'>
                        <div>이메일*</div>
                        <Input
                            id='email'
                            name='email'
                            type='text'
                            placeholder='이메일을 입력하세요'
                            onChange={(event) => handleInputChange(event, setUser)}
                            value={user.email}
                        />
                    </label>
                    <div className='helper-text'>{helperText.emailHelper}</div>
                    <label htmlFor='password' className='label'>
                        <div>비밀번호*</div>
                        <Input
                            id='password'
                            name='password'
                            type='password'
                            placeholder='비밀번호를 입력하세요'
                            onChange={(event) => handleInputChange(event, setUser)}
                            value={user.password}
                        />
                    </label>
                    <div className='helper-text'>{helperText.passwordHelper}</div>
                    <label htmlFor='password2' className='label'>
                        <div>비밀번호 확인*</div>
                        <Input
                            id='password-check'
                            name='passwordCheck'
                            type='password'
                            placeholder='비밀번호를 입력하세요'
                            onChange={(event) => handleInputChange(event, setUser)}
                            value={user.passwordCheck}
                        />
                    </label>
                    <div className='helper-text'>{helperText.passwordCheckHelper}</div>
                    <label htmlFor='nickname' className='label'>
                        <div>닉네임*</div>
                        <Input
                            id='nickname'
                            name='nickname'
                            type='text'
                            placeholder='닉네임을 입력하세요'
                            onChange={(event) => handleInputChange(event, setUser)}
                            value={user.nickname}
                        />
                    </label>
                    <div className='helper-text'>{helperText.nicknameHelper}</div>
                    <Button id='register-btn' text='회원가입' onSubmit={handleSubmit}></Button>
                </form>
            </div>
            <div className='go'>
                <Link to='http://localhost:3000/login'>로그인하러 가기</Link>
            </div>
        </main>
    );
}
