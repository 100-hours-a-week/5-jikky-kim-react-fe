import './Header.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WithLogin from './WithLogin';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const NOT_LOGINED_PATH = ['/login', '/register'];
    const location = useLocation();
    useEffect(() => {
        if (NOT_LOGINED_PATH.includes(location.pathname)) {
            return setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }, []);
    return (
        <header>
            <div id='header-flex'>
                <WithLogin isLoggedIn={isLoggedIn} />
            </div>
        </header>
    );
}
