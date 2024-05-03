import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
    const NOT_LOGINED_PATH = ['/login', '/register'];
    const location = useLocation();
    const history = useNavigate();
    const navigateToHome = () => {
        history('/');
    };
    return (
        <header>
            <div id='header-flex'>
                <div
                    id='header-text'
                    onClick={!NOT_LOGINED_PATH.includes(location.pathname) ? navigateToHome : () => {}}
                >
                    아무 말 대잔치
                </div>
            </div>
        </header>
    );
}
