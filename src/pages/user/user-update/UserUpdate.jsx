import { useState, useEffect } from 'react';
import style from './UserUpdate.module.css';
import api from '../../../utils/api';
import Form from './Form';
import { IMAGE_SERVER_URL } from '../../../constants/res';

function UserUpdate() {
    const [user, setUser] = useState({
        profile: '',
        email: '',
        nickname: '',
    });

    useEffect(() => {
        const getUser = async () => {
            const response = await api.get('/users/');
            setUser({
                profile: IMAGE_SERVER_URL + response.user.avatar,
                email: response.user.email,
                nickname: response.user.nickname,
            });
        };
        getUser();
    }, []);

    return (
        <section>
            <div className='page-title'>회원정보수정</div>
            <div className={style.update_box}>
                <Form />
            </div>
        </section>
    );
}

export default UserUpdate;
