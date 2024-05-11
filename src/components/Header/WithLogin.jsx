import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import api from '../../utils/api';
import style from './WithLogin.module.css';

function withLogin(component) {
    return function (props) {
        if (props.isLoggedIn) {
            return component(props);
        } else {
            // Login, Register Page Header
            return <div className={style.header_text}>아무 말 대잔치</div>;
        }
    };
}

// TODO : Internal React error: Expected static flag was missing. Please notify the React team. 경고 로그 없애기
const WithLogin = withLogin(({ isLoggedIn }) => {
    const location = useLocation();
    const backIconPath = ['/user/update', '/user/password'];
    const back = useRef();

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/posts');
    };
    const profileImage = useRef();
    const insertHeaderAvatar = async () => {
        const data = await api.get('/users/change');
        profileImage.current.src = data.user.avatar;
    };

    function handleBackIconClick() {
        // TODO : 뒤로가기 예외처리
        navigate(-1);
    }

    useEffect(() => {
        insertHeaderAvatar();

        // 뒤로가기 버튼
        if (backIconPath.includes(location.pathname)) {
            back.current.style.visibility = 'visible';
            back.current.innerHTML = '<';
            back.current.addEventListener('click', handleBackIconClick);

            return () => {
                back.current.removeEventListener('click', handleBackIconClick);
            };
        } else {
            back.current.style.visibility = 'hidden';
        }
    }, [location.pathname]);

    const handleLogout = async () => {
        const response = await api.get('/users/logout');
        console.log(response);
        navigate('/login');
    };

    return (
        <>
            <div className={`${style.header_profile} ${style.none} ${style.back}`} ref={back}></div>
            <div id='header-text' className={style.header_text} onClick={navigateToHome}>
                아무 말 대잔치
            </div>
            <div className={style.dropdown}>
                <img alt='user-avatar' ref={profileImage} id='profile-btn' className={style.header_profile} />
                <nav id='user-nav' className={style.dropdown_content}>
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
        </>
    );
});

export default WithLogin;
