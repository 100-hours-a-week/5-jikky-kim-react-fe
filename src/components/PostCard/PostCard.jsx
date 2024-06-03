import React from 'react';
import style from './PostCard.module.css';
import { Link } from 'react-router-dom';
import { formatCount, titleSlice, formatDate } from '../../utils/utils';
import Line from '../Line/Line';
import { IMAGE_SERVER_URL } from '../../constants/res';

const Post = (props) => {
    const {
        post_id,
        title,
        post_image,
        created_at,
        creator_nickname,
        creator_avatar,
        count_like,
        count_comment,
        count_view,
    } = props;
    return (
        <>
            <Link to={'/posts/' + post_id}>
                <div className={style.post}>
                    <div className={style.post_creator}>
                        <img className={style.avatar} alt='avatar' src={IMAGE_SERVER_URL + creator_avatar} />
                        <div className={style.creator}>{creator_nickname}</div>
                    </div>
                    <img className={style.thumbnail_img} alt='thumbnail' src={IMAGE_SERVER_URL + post_image}></img>
                    <div className={style.post_title}>{titleSlice(title)}</div>

                    <div className={style.post_mid}>
                        <div className={style.post_mid_l}>
                            <div className={style.count_like}>좋아요 {formatCount(count_like)}</div>
                            <div className={style.count_comment}>댓글 {formatCount(count_comment)}</div>
                            <div className={style.count_view}>조회수 {formatCount(count_view)}</div>
                        </div>
                        <div className={style.created_at}>{formatDate(created_at)}</div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default Post;
