import React from 'react';
import ControlButton from './ControlButton';
import style from './Post.module.css';
import { formatDate } from '../../../utils/utils';

const CommentsSection = ({ post, userId, updateCommentButtonClickHandler, deleteCommentButtonClickHandler }) => (
    <div className={style.comment_wrap}>
        {post.comments?.map((comment) => (
            <div className={style.comments} key={comment.comment_id}>
                <div className={style.comment_box}>
                    <div className={style.comment_item}>
                        <img className={style.avatar} alt='avatar' src={comment.creator_avatar} />
                        <div className={`${style.creator} ${style.comment_creator}`}>{comment.creator_nickname}</div>
                        <div className={`${style.date} ${style.comment_created_at}`}>
                            {formatDate(comment.created_at)}
                        </div>
                    </div>
                    <div className={style.comment_content}>{comment.content}</div>
                </div>
                {userId === comment.creator && (
                    <ControlButton
                        updateButtonClickHandler={() =>
                            updateCommentButtonClickHandler(comment.content, comment.comment_id)
                        }
                        deleteButtonClickHandler={() => deleteCommentButtonClickHandler(comment.comment_id)}
                    />
                )}
            </div>
        ))}
    </div>
);

export default CommentsSection;
