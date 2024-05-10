import style from './Loading.module.css';
import { forwardRef } from 'react';
const Loading = forwardRef((_, ref) => {
    return (
        <>
            <div id='loading' className={style.loading} ref={ref}>
                <div className={style.spinner}></div>
            </div>
        </>
    );
});

export default Loading;
