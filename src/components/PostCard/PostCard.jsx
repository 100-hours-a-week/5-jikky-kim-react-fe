import React from 'react';
import style from './PostCard.module.css';
import { Link } from 'react-router-dom';
import { formatCount, titleSlice, formatDate } from '../../utils/utils';
import Line from '../Line/Line';
import { IMAGE_SERVER_URL } from '../../constants/res';

const Post = (props) => {
    const { postId, title, postImage, createdAt, creatorNickname, creatorAvatar, countLike, countComment, countView } =
        props;
    return (
        <>
            <Link to={'/posts/' + postId}>
                <div className={style.post}>
                    <div className={style.post_creator}>
                        <img className={style.avatar} alt='avatar' src={IMAGE_SERVER_URL + creatorAvatar} />
                        <div className={style.creator}>{creatorNickname}</div>
                    </div>
                    <img className={style.thumbnail_img} alt='thumbnail' src={IMAGE_SERVER_URL + postImage}></img>
                    <div className={style.post_title}>{titleSlice(title)}</div>

                    <div className={style.post_mid}>
                        <div className={style.post_mid_l}>
                            <div className={style.countLike}>좋아요 {formatCount(countLike)}</div>
                            <div className={style.countComment}>댓글 {formatCount(countComment)}</div>
                            <div className={style.countView}>조회수 {formatCount(countView)}</div>
                        </div>
                        <div className={style.createdAt}>{formatDate(createdAt)}</div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default Post;
