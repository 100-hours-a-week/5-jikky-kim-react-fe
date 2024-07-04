import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../utils/api';
import useFormValidation from '../../hooks/useFormValidation';
import useFileInput from '../../hooks/useFileInput';
import { handleInputChange } from '../../utils/utils';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

import style from './Form.module.css';

export const Form = (props) => {
    const navigate = useNavigate();
    const registerForm = useRef();

    const [user, setUser] = useState({
        profile: '',
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
    });

    const { helperText, isValid, setHelperText } = useFormValidation(user);
    const { imageInput, preview, fileInputHandler } = useFileInput(setUser, setHelperText);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValid) {
            try {
                const formData = new FormData(registerForm.current);
                const response = await api.post('/users/register', formData);
                console.log(response);
                if (response?.message === 'user registered successfully') {
                    alert('회원가입이 완료되었습니다.');
                    return navigate('/login');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <form {...props} className={style.form} ref={registerForm} onSubmit={handleSubmit}>
            <div className='label'>프로필 사진</div>
            <div className='helper-text'>{helperText.profileHelper}</div>
            <div className='flex'>
                <label ref={imageInput} className={style.image_input} htmlFor='profile'>
                    <div className={style.add_icon}>+</div>
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
    );
};

export default Form;
