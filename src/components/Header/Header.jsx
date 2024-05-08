import './Header.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Header() {
    const NOT_LOGINED_PATH = ['/login', '/register'];
    const location = useLocation();
    const history = useNavigate();
    const navigateToHome = () => {
        history('/posts');
    };

    // // TODO : 데이터 연결
    // const insertHeaderAvatar = (userAvatar) => {
    //     const profileBtn = document.getElementById('profile-btn');
    //     profileBtn.setAttribute('src', userAvatar);
    // };
    // insertHeaderAvatar('/avatar.jpg');
    return (
        <header>
            <div id='header-flex'>
                {/* 로그인 한 상태 */}
                {!NOT_LOGINED_PATH.includes(location.pathname) ? (
                    <>
                        <div className='header-profile none'></div>
                        <div id='header-text' onClick={navigateToHome}>
                            아무 말 대잔치
                        </div>
                        <div className='dropdown'>
                            <img alt='user-avatar' src={''} id='profile-btn' className='header-profile drop-btn' />
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
                ) : (
                    // 로그인 안 한 상태
                    <div id='header-text'>아무 말 대잔치</div>
                )}
            </div>
        </header>
    );
}
