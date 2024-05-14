import style from './Loading.module.css';
import { forwardRef } from 'react';
const Loading = forwardRef((props, ref) => {
    return (
        <>
            <div ref={ref} className={style.loading}>
                <div className={style.spinner}></div>
            </div>
        </>
    );
});

export default Loading;
