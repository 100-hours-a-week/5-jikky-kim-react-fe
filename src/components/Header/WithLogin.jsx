import { useNavigate, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import api from '../../utils/api';

function withLogin(component) {
    return function (props) {
        if (props.isLoggedIn) {
            return component(props);
        } else {
            // Login, Register Page Header
            return <div id='header-text'>아무 말 대잔치</div>;
        }
    };
}

// TODO : Internal React error: Expected static flag was missing. Please notify the React team. 경고 로그 없애기
const WithLogin = withLogin(({ isLoggedIn }) => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/posts');
    };
    const profileImage = useRef();
    const insertHeaderAvatar = async () => {
        const data = await api.get('/users/change');
        profileImage.current.src = data.user.avatar;
    };
    useEffect(() => {
        insertHeaderAvatar();
    }, []);
    return (
        <>
            <div className='header-profile none'></div>
            <div id='header-text' onClick={navigateToHome}>
                아무 말 대잔치
            </div>
            <div className='dropdown'>
                <img alt='user-avatar' ref={profileImage} id='profile-btn' className='header-profile drop-btn' />
                <nav id='user-nav' className='dropdown-content'>
                    <Link className='user-nav-item' to='/user/update'>
                        회원정보 수정
                    </Link>
                    <Link className='user-nav-item' to='/user/password'>
                        비밀번호 수정
                    </Link>
                    <Link className='user-nav-item' id='logout-btn'>
                        로그아웃
                    </Link>
                </nav>
            </div>
        </>
    );
});

export default WithLogin;
