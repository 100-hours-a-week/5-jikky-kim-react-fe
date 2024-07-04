import style from './Register.module.css';
import { Link } from 'react-router-dom';

import Form from './Form';

export default function Register() {
    return (
        <main className={style.main}>
            <div className='page-title'>회원가입</div>
            <div className='flex'>
                <Form />
            </div>
            <div className='go'>
                <Link to='http://localhost:3000/login'>로그인하러 가기</Link>
            </div>
        </main>
    );
}
