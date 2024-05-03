import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validate';
import { activateButton, deactivateButton } from '../utils/utils';

import Button from '../components/Button/Button';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailHelper, setEmailHelper] = useState('');
    const [passwordHelper, setPasswordHelper] = useState('');

    const handleEmailChange = (e) => {
        let input = e.target.value;
        deactivateButton('login-btn');
        setEmail(input);
        if (validateEmail(input)) {
            setEmailHelper('');
            if (validatePassword(password)) {
                return activateButton('login-btn');
            }
        } else {
            setEmailHelper('*올바른 이메일 주소 형식을 입력해주세요. (예:example@example.com)');
        }
    };

    const handlePasswordChange = (e) => {
        let input = e.target.value;
        deactivateButton('login-btn');
        setPassword(input);
        if (validatePassword(input)) {
            setPasswordHelper('');
            if (validateEmail(email)) {
                console.log('activate');
                return activateButton('login-btn');
            }
        } else {
            setPasswordHelper(
                <div>
                    *비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 <br />
                    최소 1개 포함해야합니다.'
                </div>
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기서는 간단하게 email과 password를 콘솔에 출력하는 예시 코드를 작성합니다.
        console.log('Email:', email);
        console.log('Password:', password);
        // 로그인 로직을 여기에 추가하세요.
    };

    return (
        <div>
            <div id="login-text">로그인</div>
            <div id="login-box">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="login-label">
                        <div>이메일</div>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="이메일을 입력하세요"
                        />
                    </label>
                    <div className="helper-text" id="email-helper">
                        {emailHelper}
                    </div>
                    <label htmlFor="password" className="login-label">
                        <div>비밀번호</div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </label>

                    <div className="helper-text" id="password-helper">
                        {passwordHelper}
                    </div>
                    <Button id="login-btn" text="로그인" />
                </form>
            </div>
            <div id="register-text">
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    회원가입
                </Link>
            </div>
        </div>
    );
}
