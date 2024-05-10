import React from 'react';
import style from './Button.module.css';

function Button({ id, text }) {
    return (
        <button className={style.button} id={id}>
            {text}
        </button>
    );
}

export default Button;
