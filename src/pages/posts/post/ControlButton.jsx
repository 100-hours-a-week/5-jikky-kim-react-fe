import React from 'react';
import style from './Post.module.css';

function ControlButton({ updateButtonClickHandler, deleteButtonClickHandler }) {
    return (
        <div className={style.comment_item}>
            <button className={style.comment_item_button} onClick={updateButtonClickHandler}>
                수정
            </button>
            <button
                className={`${style.comment_item_button} ${style.del_comment_modal_btn}`}
                onClick={deleteButtonClickHandler}
            >
                삭제
            </button>
        </div>
    );
}

export default ControlButton;
