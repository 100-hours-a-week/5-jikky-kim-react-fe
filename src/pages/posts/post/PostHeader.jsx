import React from 'react';
import ControlButton from './ControlButton';
import style from './Post.module.css';

const PostHeader = ({ post, userId, updatePostButtonClickHandler, deletePostButtonClickHandler }) => (
    <div className={style.post_header}>
        <div className={style.post_header_item}>
            <img id='avatar' className={style.avatar} alt='profile' src={post.creatorAvatar}></img>
            <div id='creator' className={style.creator}>
                {post.creatorNickname}
            </div>
            <div id='post-created-at' className={style.date}>
                {post.created_at}
            </div>
        </div>
        {userId === post.user_id && (
            <ControlButton
                updateButtonClickHandler={updatePostButtonClickHandler}
                deleteButtonClickHandler={deletePostButtonClickHandler}
            />
        )}
    </div>
);

export default PostHeader;
