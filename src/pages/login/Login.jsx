import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validate';
import { activateButton, deactivateButton, updateState, handleInputChange } from '../../utils/utils';
import { HELPER_TEXT } from '../../constants/helperText';
import api from '../../utils/api';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [helperText, setHelperText] = useState({
        emailHelper: '',
        passwordHelper: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        deactivateButton('login-btn');
        // email 검증
        if (user.email === '') updateState('emailHelper', HELPER_TEXT.EMAIL_EMPTY, setHelperText);
        else {
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

        if (validateEmail(user.email) && validatePassword(user.password)) activateButton('login-btn');
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: user.email,
            password: user.password,
        };
        if (validateEmail(user.email) && validatePassword(user.password)) {
            const response = await api.post('/users/login', data);
            console.log(response);
            if (response?.message === 'login success') {
                return navigate('/posts');
            }
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
            navigate('/login');
        }
    };

    return (
        <div>
            <div className='page-title'>로그인</div>
            <div className='flex'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email' className='label'>
                        <div>이메일</div>
                        <Input
                            type='text'
                            id='email'
                            name='email'
                            value={user.email}
                            onChange={(event) => handleInputChange(event, setUser)}
                            placeholder='이메일을 입력하세요'
                        />
                    </label>
                    <div className='helper-text' id='email-helper'>
                        {helperText.emailHelper}
                    </div>
                    <label htmlFor='password' className='label'>
                        <div>비밀번호</div>
                        <Input
                            type='password'
                            id='password'
                            name='password'
                            value={user.password}
                            onChange={(event) => handleInputChange(event, setUser)}
                            placeholder='비밀번호를 입력하세요'
                        />
                    </label>

                    <div className='helper-text' id='password-helper'>
                        {helperText.passwordHelper}
                    </div>
                    <Button id='login-btn' text='로그인' />
                </form>
            </div>
            <div className='go'>
                <Link to='/register' style={{ textDecoration: 'none' }}>
                    회원가입
                </Link>
            </div>
        </div>
    );
}
