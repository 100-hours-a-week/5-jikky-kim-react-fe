import React from 'react';
import style from './PostCard.module.css';
import { Link } from 'react-router-dom';
import { formatCount, titleSlice, formatDate } from '../../utils/utils';
import Line from '../Line/Line';

const Post = (props) => {
    const { post_id, title, created_at, creator_nickname, creator_avatar, count_like, count_comment, count_view } =
        props;
    return (
        <>
            <Link to={'/posts/' + post_id}>
                <div className={style.post}>
                    <div className={style.post_title}>{titleSlice(title)}</div>
                    <div className={style.post_mid}>
                        <div className={style.post_mid_l}>
                            <div className={style.count_like}>좋아요 {formatCount(count_like)}</div>
                            <div className={style.count_comment}>댓글 {formatCount(count_comment)}</div>
                            <div className={style.count_view}>조회수 {formatCount(count_view)}</div>
                        </div>
                        <div className={style.created_at}>{formatDate(created_at)}</div>
                    </div>
                    <Line />
                    <div className={style.post_creator}>
                        <img className={style.avatar} alt='avatar' src={creator_avatar} />
                        <div className={style.creator}>{creator_nickname}</div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default Post;
