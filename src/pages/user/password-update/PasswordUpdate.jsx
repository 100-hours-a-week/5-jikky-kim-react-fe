import { useRef, useState, useEffect } from 'react';
import { validatePassword, validateInput } from '../../../utils/validate';
import { activateButton, deactivateButton, updateState, handleInputChange } from '../../../utils/utils';
import api from '../../../utils/api';

import Button from '../../../components/Button/Button';
import Toast from '../../../components/Toast/Toast';
import Input from '../../../components/Input/Input';

import style from './PasswordUpdate.module.css';

function PasswordUpdate() {
    const toastMessage = useRef();

    const [active, setActive] = useState('toast');

    // input
    const [user, setUser] = useState({
        password: '',
        passwordCheck: '',
    });

    // helper-text
    const [helperText, setHelperText] = useState({
        passwordHelper: '',
        passwordCheckHelper: '',
    });

    const isValid = validatePassword(user.password) && user.password === user.passwordCheck;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValid) {
            try {
                const response = await api.patch('/users/password/change', { password: user.password });
                console.log(response);
                if (response.message === 'Same As The Original Password') {
                    toastMessage.current.innerHTML = '원래 비밀번호와 같습니다.';
                } else {
                    toastMessage.current.innerHTML = '수정 완료';
                }
                // TOAST 출력
                setActive('toast-active');
                setTimeout(function () {
                    setActive('toast');
                }, 1000);
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        validateInput.password(user.password, updateState, setHelperText);
        validateInput.passwordCheck(user.password, user.passwordCheck, updateState, setHelperText);
        if (isValid) {
            return activateButton('update-password-btn');
        }
        deactivateButton('update-password-btn');
    }, [user, isValid]);

    return (
        <section>
            <div className='page-title'>비밀번호 수정</div>
            <div className={style.form_box}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='password' className={style.form_label}>
                        <div>비밀번호</div>
                        <Input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='비밀번호를 입력하세요'
                            onChange={(event) => handleInputChange(event, setUser)}
                        />
                    </label>
                    <div className='password-helper helper-text'>{helperText.passwordHelper}</div>
                    <label htmlFor='password-check' className={style.form_label}>
                        <div>비밀번호 확인</div>
                        <Input
                            type='password'
                            id='password-check'
                            name='passwordCheck'
                            placeholder='비밀번호를 한번 더 입력하세요'
                            onChange={(event) => handleInputChange(event, setUser)}
                        />
                    </label>
                    <div className='password-helper2 helper-text'>{helperText.passwordCheckHelper}</div>
                    <Button id='update-password-btn' text='수정하기' />
                    <Toast ref={toastMessage} active={active}>
                        수정 완료
                    </Toast>
                </form>
            </div>
        </section>
    );
}

export default PasswordUpdate;
