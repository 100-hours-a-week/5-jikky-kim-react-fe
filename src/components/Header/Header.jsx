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
