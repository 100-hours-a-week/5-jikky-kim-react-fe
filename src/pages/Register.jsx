import style from './Register.module.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validateNickname, validateInput } from '../utils/validate';
import { HELPER_TEXT } from '../constants/helperText';
import { activateButton, deactivateButton, updateState, handleInputChange } from '../utils/utils';
import api from '../utils/api';

import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

export default function Register() {
    const navigate = useNavigate();
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

    const registerForm = useRef();
    const imageInput = useRef();
    const preview = useRef();

    const isValid =
        validateEmail(user.email) &&
        validatePassword(user.password) &&
        validateNickname(user.nickname) === true &&
        user.password === user.passwordCheck &&
        user.profile;

    useEffect(() => {
        // input 검증
        validateInput.email(user.email, updateState, setHelperText);
        validateInput.password(user.password, updateState, setHelperText);
        validateInput.passwordCheck(user.password, user.passwordCheck, updateState, setHelperText);
        validateInput.nickname(user.nickname, updateState, setHelperText);

        if (isValid) {
            return activateButton('register-btn');
        }
        deactivateButton('register-btn');
    }, [user, isValid]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValid) {
            try {
                const formData = new FormData(registerForm.current);
                const response = await api.post('/users/register', formData);
                console.log(response);
                if (response?.message === 'user registered successfully') {
                    return navigate('/login');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const fileInputHandler = async (event) => {
        const file = event.target.files[0];
        if (event.target.files && file) {
            var reader = new FileReader();
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

    return (
        <main className={style.main}>
            <div className='page-title'>회원가입</div>
            <div className='flex'>
                <form id='register-form' ref={registerForm} onSubmit={handleSubmit}>
                    <div className='label'>프로필 사진</div>
                    <div className='helper-text'>{helperText.profileHelper}</div>
                    <div className='flex'>
                        <label id='image-input' ref={imageInput} className={style.image_input} htmlFor='profile'>
                            <div id='add-icon' className={style.add_icon}>
                                +
                            </div>
                        </label>
                    </div>

                    <div className='flex'>
                        <img id='preview' ref={preview} className={style.preview} alt='profile-preview' />
                    </div>
                    <Input
                        type='file'
                        name='avatar'
                        id='profile'
                        className={style.profile}
                        accept='image/*'
                        onChange={fileInputHandler}
                    />
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
                    <Button id='register-btn' text='회원가입'></Button>
                </form>
            </div>
            <div className='go'>
                <Link to='http://localhost:3000/login'>로그인하러 가기</Link>
            </div>
        </main>
    );
}
