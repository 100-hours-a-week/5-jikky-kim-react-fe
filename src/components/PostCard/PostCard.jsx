import React from 'react';
import style from './PostCard.module.css';
import { Link } from 'react-router-dom';
import { formatCount, titleSlice } from '../../utils/utils';

const Post = (props) => {
    const { post_id, title, created_at, creator, count } = props;
    return (
        <>
            <Link to={'/posts/' + post_id}>
                <div className={style.post}>
                    <div className={style.post_title}>{titleSlice(title)}</div>
                    <div className={style.post_mid}>
                        <div className={style.post_mid_l}>
                            <div className={style.count_like}>좋아요 {formatCount(count.like)}</div>
                            <div className={style.count_comment}>댓글 {formatCount(count.comment)}</div>
                            <div className={style.count_view}>조회수 {formatCount(count.view)}</div>
                        </div>
                        <div className={style.created_at}>{created_at}</div>
                    </div>
                    <div className='line'></div>
                    <div className={style.post_creator}>
                        <img className={style.avatar} alt='avatar' src={creator.avatar} />
                        <div className={style.creator}>{creator.nickname}</div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default Post;
