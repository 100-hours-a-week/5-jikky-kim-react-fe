# **프로젝트 소개**

기본적인 게시판의 형태를 띄고 있는 커뮤니티 프로젝트로 기술간의 장단점을 체감하기 위해 버전에 따라 다른 기술로 구현

-   ver1 : `vanila` `express` `json`
    -   [🔗FE Github](https://github.com/jjikky/5-jikky-kim-vanila-fe)
    -   [🔗BE Github](https://github.com/jjikky/5-jikky-kim-express-be/tree/json-archive)
-   ver2 : `react` `express` `mySQL`

    -   [🔗FE Github](https://github.com/jjikky/5-jikky-kim-react-fe/tree/with-express)
    -   [🔗BE Github](https://github.com/jjikky/5-jikky-kim-express-be)

-   ver3 : `react` `spring` `mySQL`

    -   [🔗FE Github](https://github.com/jjikky/5-jikky-kim-react-fe)
    -   [🔗BE Github](https://github.com/jjikky/5-jikky-kim-spring-be)

# 커뮤니티 게시판 ver 3 FE

## 사용 기술

`Express` `html/css` `javascript` `React` `mySQL`

-   ver 3 FE는 ver 2와 거의 유사합니다.
-   데이터를 받아오는 구조와 일부 css만 약간 변경 되었음으로 아래 내용은 모두 ver2와 동일합니다.

## 시연 영상

https://github.com/100-hours-a-week/5-jikky-kim-react-fe/assets/59151187/6a78967d-4bb8-4ebd-920d-f7e8b4000ff8

## 개발 내용

-   개발 용어 한국어 발음 검색 기능
-   무한 스크롤 구현
-   로딩, 토스트 메세지 구현
-   `preload` 방식의 font import로 지연 시간 없이 웹폰트 서빙
    -   좋은 사용자 경험을 위해 브라우저가 최대한 빨리 폰트를 가져올 수 있게 함
-   웹 콘텐츠 접근성 지침에 따른 대체 텍스트(`Alt`값) 제공, `label` 태그를 활용 하고, 웹 콘텐츠 접근성 지침을 이해하기 위해 노력
-   디바운싱을 활용하여 불필요한 요청을 최대한 제거하여 서버 부담 감소

<details>
<summary>fetch 중복 제거</summary>
    
```javascript

const SERVER_URL = 'http://localhost:5000';
const ErrorMessage = '../constants/error-message';

export const apiHeaders = new Headers();

const api = {
    get: async (path, params, options) => {
        try {
            if (params) {
                const filteredParams = Object.fromEntries(
                    Object.entries(params)
                        .filter(([_, value]) => (typeof value === 'number' && !isNaN(value)) || value !== undefined)
                        .map(([key, value]) => [key, String(value)])
                );
                path += '?' + new URLSearchParams(filteredParams).toString();
            }

            const res = await fetch(`${SERVER_URL}${path}`, {
                method: 'GET',
                headers: apiHeaders,
                credentials: 'include',
                ...options,
            });

            return handleResponse(res);
        } catch (err) {
            throw new Error(ErrorMessage.NETWORK_ERROR);
        }
    },

    post: async (path, params, options) => {
        try {
            const { body } = handleMutateRequest(params);
            const res = await fetch(`${SERVER_URL}${path}`, {
                method: 'POST',
                headers: apiHeaders,
                credentials: 'include',
                body,
                ...options,
            });

            return handleResponse(res);
        } catch (err) {
            throw new Error(ErrorMessage.NETWORK_ERROR);
        }
    },

    patch: async (path, params, options) => {
        try {
            const { body } = handleMutateRequest(params);
            const res = await fetch(`${SERVER_URL}${path}`, {
                method: 'PATCH',
                headers: apiHeaders,
                credentials: 'include',
                body,
                ...options,
            });

            return handleResponse(res);
        } catch (err) {
            throw new Error(ErrorMessage.NETWORK_ERROR);
        }
    },

    put: async (path, params, options) => {
        try {
            const { body } = handleMutateRequest(params);
            const res = await fetch(`${SERVER_URL}${path}`, {
                method: 'PATCH',
                headers: apiHeaders,
                credentials: 'include',
                body,
                ...options,
            });

            return handleResponse(res);
        } catch (err) {
            throw new Error(ErrorMessage.NETWORK_ERROR);
        }
    },

    delete: async (path, params, options) => {
        try {
            const { body } = handleMutateRequest(params);
            const res = await fetch(`${SERVER_URL}${path}`, {
                method: 'DELETE',
                headers: apiHeaders,
                credentials: 'include',
                body,
                ...options,
            });

            return handleResponse(res);
        } catch (err) {
            throw new Error(ErrorMessage.NETWORK_ERROR);
        }
    },
};

export default api;

// params 타입에 따라 formData or json 데이터로 처리
const handleMutateRequest = (params) => {
    const isFormData = params instanceof FormData;
    let body;

    if (isFormData) {
        apiHeaders.delete('Content-Type');
        body = params;
    } else {
        apiHeaders.set('Content-Type', 'application/json');
        body = JSON.stringify(params);
    }

    return { body };
};

// Content-Type에 따라 응답 데이터 처리
const parseResponseData = (res) => {
    const contentType = res.headers.get('Content-Type');
    if (!contentType) {
        throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR);
    }

    if (contentType.includes('application/json')) {
        return res.json();
    } else if (contentType.includes('text')) {
        return res.text();
    }
    return res.blob();
};

// 응답 status 상태에 따라 return data 혹은 throw Error
const handleResponse = async (res) => {
    try {
        const data = await parseResponseData(res);
        if (res.ok) {
            return data;
        }

        const errorMessage = res.status === 404 ? ErrorMessage.BAD_REQUEST : await data;
        // throw new Error(errorMessage);
        console.log(errorMessage);
        return data;
    } catch (err) {
        if (typeof window !== 'undefined') {
            // throw new CustomHttpError(res.status, err.message);
            console.log(new CustomHttpError(res.status, err.message));
        }
        return res.status;
    }
};

class CustomHttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

```


</details>


<details>
<summary>커스텀 훅</summary>

**useFormValidation**

- 폼 입력 값의 유효성 검사를 담당하는 커스텀 훅
    - **유효성 검사**: 이메일, 비밀번호, 닉네임의 유효성을 검사
    - **helperText 상태 관리**: 각 입력 필드에 대한 헬퍼 텍스트를 관리
    - **폼 유효성 검사**: 모든 입력이 유효한지 확인하고, 유효하면 버튼을 활성화하고, 그렇지 않으면 버튼을 비활성화
    
```javascript

import { useState, useEffect } from 'react';
import { validateEmail, validatePassword, validateNickname, validateInput } from '../utils/validate';
import { HELPER_TEXT } from '../constants/helperText';
import { activateButton, deactivateButton, updateState } from '../utils/utils';

const useFormValidation = (user) => {
    const [helperText, setHelperText] = useState({
        profileHelper: HELPER_TEXT.PROFILE_EMPTY,
        emailHelper: '',
        passwordHelper: '',
        passwordCheckHelper: '',
        nicknameHelper: '',
    });

    const isValid =
        validateEmail(user.email) &&
        validatePassword(user.password) &&
        validateNickname(user.nickname) === true &&
        user.password === user.passwordCheck &&
        user.profile;

    useEffect(() => {
        validateInput.email(user.email, updateState, setHelperText);
        validateInput.password(user.password, updateState, setHelperText);
        validateInput.passwordCheck(user.password, user.passwordCheck, updateState, setHelperText);
        validateInput.nickname(user.nickname, updateState, setHelperText);

        if (isValid) {
            activateButton('register-btn');
        } else {
            deactivateButton('register-btn');
        }
    }, [user, isValid]);

    return { helperText, isValid, setHelperText };
};

export default useFormValidation;


```


**useFileInput**

- 파일 입력과 이미지 미리보기를 관리하는 커스텀 훅
    - **파일 입력 관리**: 파일 입력을 처리하고, 선택한 파일을 미리보기로 표시합니다.
    - **상태 업데이트**: 선택한 파일의 이름을 상태에 업데이트하고, 파일이 없을 때는 기본 상태로 되돌립니다.

```jsx
import { useRef } from 'react';
import { updateState } from '../utils/utils';
import { HELPER_TEXT } from '../constants/helperText';

const useFileInput = (setUser, setHelperText) => {
    const imageInput = useRef();
    const preview = useRef();

    const fileInputHandler = (event) => {
        const file = event.target.files[0];
        if (event.target.files && file) {
            const reader = new FileReader();
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

    return { imageInput, preview, fileInputHandler };
};

export default useFileInput;

```

**사용예시**

**회원가입 form.jsx**

```jsx
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
        <form {...props} ref={registerForm} onSubmit={handleSubmit}>
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

```

</details>



<details>
<summary>고차 컴포넌트로 페이지 헤더 반환</summary>

**Header.jsx**

```javascript
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { NOT_LOGINED_PATH } from '../../constants/path';

import WithLogin from './WithLogin';

import style from './Header.module.css';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (NOT_LOGINED_PATH.includes(location.pathname)) {
            return setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }, [location.pathname]);

    return (
        <header className={style.header}>
            <div className={style.header_flex}>
                <WithLogin isLoggedIn={isLoggedIn} />
            </div>
        </header>
    );
}

```

**WithLogin.jsx**

```javascript
import { useRef, useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import api from '../../utils/api';
import { IMAGE_SERVER_URL } from '../../constants/res';
import { NonBackIconPath } from '../../constants/path';

import Toast from '../Toast/Toast';

import style from './WithLogin.module.css';
import { userIcon } from '../../assets/icons';

function withLogin(Component) {
    return function WithLoginComponent(props) {
        if (props.isLoggedIn) {
            return <Component {...props} />;
        }
        return <div className={style.header_text}>Dev Word</div>;
    };
}

const WithLogin = withLogin(({ isLoggedIn }) => {
    const toastMessage = useRef();
    const profileImage = useRef();
    const back = useRef();

    const location = useLocation();
    const navigate = useNavigate();

    const [active, setActive] = useState('toast');

    const navigateToHome = () => {
        navigate('/posts');
    };

    const insertHeaderAvatar = async () => {
        try {
            const res = await api.get('/users/');
            if (res.status === 'fail') {
                return navigate('/login');
            }
            if (profileImage.current) {
                profileImage.current.src = `${IMAGE_SERVER_URL}${res.user.avatar}`;
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const handleBackIconClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        insertHeaderAvatar();

        if (!NonBackIconPath.includes(location.pathname)) {
            if (back.current) {
                back.current.style.visibility = 'visible';
                back.current.innerHTML = '<';
                back.current.addEventListener('click', handleBackIconClick);

                return () => {
                    if (back.current) {
                        back.current.removeEventListener('click', handleBackIconClick);
                    }
                };
            }
        } else {
            if (back.current) {
                back.current.style.visibility = 'hidden';
            }
        }
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await api.get('/users/logout');
            setActive('toast-active');
            setTimeout(() => {
                setActive('toast');
                navigate('/login');
            }, 1000);
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <>
            <div className={`${style.header_profile} ${style.none} ${style.back}`} ref={back}></div>
            <div className={style.header_text} onClick={navigateToHome}>
                Dev Word
            </div>
            <div className={style.dropdown}>
                <img
                    alt='user-avatar'
                    src={userIcon}
                    ref={profileImage}
                    id='profile-btn'
                    className={style.header_profile}
                />
                <nav className={style.dropdown_content}>
                    <Link className={style.user_nav_item} to='/words'>
                        발음 검색
                    </Link>
                    <Link className={style.user_nav_item} to='/user/update'>
                        회원정보 수정
                    </Link>
                    <Link className={style.user_nav_item} to='/user/password'>
                        비밀번호 수정
                    </Link>
                    <div className={style.user_nav_item} id='logout-btn' onClick={handleLogout}>
                        로그아웃
                    </div>
                </nav>
            </div>
            <Toast ref={toastMessage} active={active}>
                로그아웃 완료
            </Toast>
        </>
    );
});

export default WithLogin;

```

</details>



## 프로젝트 구조

```bash
project-root/
│
├── node_modules/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Button/
│   │   ├── Header/
│   │   ├── Input/
│   │   ├── Info/
│   │   ├── Line/
│   │   ├── Loading/
│   │   ├── Modal/
│   │   ├── PostCard/
│   │   ├── Toast/
│   │   ├── WordCard/
│   │
│   ├── constants/
│   │
│   ├── pages/
│   │   ├── login/
│   │   ├── posts/
│   │   ├── register/
│   │   ├── user/
│   │   ├── words/
│   │
│   ├── utils/
│   │
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│
├── .gitignore
├── .prettierrc
├── package-lock.json
├── package.json
└── README.md

```

## 회고 및 개발 일지

-   [🔗4,5주차 회고](https://velog.io/@jikky/%EC%B9%B4%EC%B9%B4%EC%98%A4-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%8A%A4%EC%BF%A8-45%EC%A3%BC%EC%B0%A8-%ED%9A%8C%EA%B3%A0)
-   [🔗2024-05-14 : ref 여러개 전달](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-14.md)
-   [🔗2024-05-11 : 헤더 리팩토](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-11.md)
-   [🔗2024-05-10 : forwardRef](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-10.md)
-   [🔗2024-05-08 : useRef와 getElementById, 고차함수](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-08.md)
-   [🔗2024-05-03 : 클로저, useEffect](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-03.md)
-   [🔗2024-05-02 : react폴더구조, es6 실무](https://github.com/jjikky/jikky-til/blob/main/May/2024-05-02.md)

