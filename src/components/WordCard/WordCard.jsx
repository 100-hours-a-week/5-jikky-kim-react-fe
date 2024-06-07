import React from 'react';
import style from './WordCard.module.css';
import { titleSlice } from '../../utils/utils';

const WordCard = (props) => {
    const { title, content } = props;
    return (
        <>
            <div className={style.post}>
                <div className={style.post_title}>{titleSlice(title)}</div>
                <div className={style.post_content}>{content}</div>
            </div>
        </>
    );
};

export default WordCard;
