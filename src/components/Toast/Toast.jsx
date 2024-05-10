import style from './Toast.module.css';
import { forwardRef } from 'react';
const Toast = forwardRef((props, ref) => {
    return (
        <div id='toast' className={`${style[props.active]}`} ref={ref}>
            {props.children}
        </div>
    );
});

export default Toast;
