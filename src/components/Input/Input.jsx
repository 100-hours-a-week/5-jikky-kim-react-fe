import style from './Input.module.css';
import { forwardRef } from 'react';
const Input = forwardRef((props, ref) => {
    return <input className={style.input} ref={ref} {...props} />;
});

export default Input;
