import style from './Header.module.css';
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
    }, [location.pathname]);

    return (
        <header className={style.header}>
            <div id='header-flex' className={style.header_flex}>
                <WithLogin isLoggedIn={isLoggedIn} />
            </div>
        </header>
    );
}
