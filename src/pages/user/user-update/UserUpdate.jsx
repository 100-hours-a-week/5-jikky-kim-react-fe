import { useState, useRef, useEffect } from 'react';
import style from './UserUpdate.module.css';
import api from '../../../utils/api';
import Toast from '../../../components/Toast/Toast';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Form from './Form';
function UserUpdate() {
    const [active, setActive] = useState('toast');
    const toastMessage = useRef();

    const [user, setUser] = useState({
        profile: '',
        email: '',
        nickname: '',
    });

    useEffect(() => {
        const getUser = async () => {
            const response = await api.get('/users/change');
            setUser({
                profile: response.user.avatar,
                email: response.user.email,
                nickname: response.user.nickname,
            });
        };
        getUser();
    }, []);

    // 변경 로직에 삽입
    // setActive('toast-active');
    // setTimeout(function () {
    //     setActive('toast');
    // }, 1000);

    return (
        <section>
            <div className='page-title'>회원정보수정</div>
            <div className={style.update_box}>
                <Form />
                <div className={style.overlay}>
                    <div className={style.wd_modal}>
                        <div className={style.wd_modal_body}>
                            <div className={style.modal_title}>회원탈퇴 하시겠습니까?</div>
                            <div className={style.modal_message}>작성된 게시글과 댓글은 삭제됩니다.</div>
                            <div className={style.modal_sel_btn}>
                                <button className={`${style.btn_cancel} ${style.wd_x}`}>취소</button>
                                <button className={`${style.ok} ${style.wd_o}`}>확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserUpdate;
