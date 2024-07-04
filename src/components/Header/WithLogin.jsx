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
