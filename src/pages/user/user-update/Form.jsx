import { useState, useRef, useEffect } from 'react';
import api from '../../../utils/api';
import Toast from '../../../components/Toast/Toast';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { validateInput } from '../../../utils/validate';
import { activateButton, deactivateButton, updateState, handleInputChange } from '../../../utils/utils';
import style from './Form.module.css';

function Form() {
    const [active, setActive] = useState('toast');
    const [isValid, setIsValid] = useState(false);

    const toastMessage = useRef();
    const imageInput = useRef();
    const preview = useRef();
    const updateForm = useRef();

    const [user, setUser] = useState({
        profile: '',
        email: '',
        nickname: '',
    });

    const [helperText, setHelperText] = useState({
        nicknameHelper: '',
    });

    const validateNickname = async () => {
        const response = await validateInput.nickname(user.nickname, updateState, setHelperText);
        if (response === true) {
            setIsValid(true);
            return activateButton('update-btn');
        }
        setIsValid(false);
        deactivateButton('update-btn');
    };

    const getUser = async () => {
        const response = await api.get('/users/change');
        setUser({
            profile: response.user.avatar,
            email: response.user.email,
            nickname: response.user.nickname,
        });
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

            // preview에 input click 연결
            preview.current.addEventListener('click', function () {
                event.target.click();
            });
        } else {
            imageInput.current.style.display = 'block';
            preview.current.style.display = 'none';
            preview.current.src = '';
            updateState('profile', '', setUser);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValid) {
            try {
                const formData = new FormData(updateForm.current);
                formData.append('email', user.email);
                const response = await api.patch('/users', formData);
                console.log(response);
                const updatedUser = {
                    profile: response.user.avatar,
                    email: response.user.email,
                    nickname: response.user.nickname,
                };
                setUser(updatedUser);
                setActive('toast-active');
                setTimeout(function () {
                    setActive('toast');
                    // TODO : 헤더 아바타 상태 업데이트가 안되서 페이지 새로 고침으로 임시 대처
                    // 전역상태관리 필요할 것으로 예상 됨
                    window.location.href = '/user/update';
                }, 1000);
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        validateNickname();
    }, [user.nickname]);

    return (
        <form className={style.update_form} ref={updateForm} onSubmit={handleSubmit}>
            <div className={style.update_label}>프로필 사진*</div>

            <div className={style.image_box}>
                <label className={style.image_input} htmlFor='profile' ref={imageInput}>
                    <img alt='user_avatar' className={style.avatar} src={user.profile} />
                    <div className={style.change_profile_btn}>변경</div>
                </label>
            </div>

            <div className={style.image_box}>
                <img className={style.preview} alt='preview' ref={preview} />
            </div>
            <Input
                type='file'
                id='profile'
                name='avatar'
                className={style.profile}
                accept='image/*'
                // ref={imageInput}
                onChange={(event) => fileInputHandler(event)}
            />

            <div className={style.update_label}>이메일*</div>
            <div className={style.email} id='email'>
                {user.email}
            </div>

            <label htmlFor='nickname'>
                <div className={style.update_label}>닉네임*</div>
                <Input
                    name='nickname'
                    type='text'
                    placeholder='닉네임을 입력하세요.'
                    value={user.nickname}
                    onChange={(event) => handleInputChange(event, setUser)}
                />
                <div className='nickname-helper helper-text'>{helperText.nicknameHelper}</div>
            </label>
            <Button id='update-btn' text='수정하기'></Button>
            <div className={style.user_wd_btn}>회원 탈퇴</div>
            <Toast ref={toastMessage} active={active}>
                수정 완료
            </Toast>
        </form>
    );
}

export default Form;
