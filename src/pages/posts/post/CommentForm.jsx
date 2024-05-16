import { forwardRef } from 'react';
import style from './Post.module.css';
import Line from '../../../components/Line/Line';

const CommentForm = forwardRef((props, ref) => {
    const { commentForm, commentBtn } = ref;
    return (
        <form className={style.form} onSubmit={props.onSubmitHandler} ref={commentForm}>
            <textarea
                type='text'
                name='comment'
                className={style.comment}
                placeholder='댓글을 남겨주세요!'
                value={props.commentInput.comment}
                onChange={props.onChangeHandler}
            />
            <Line />
            <div className={style.btn_wrapper}>
                <button id='comment-create-btn' type='submit' className={style.comment_btn} ref={commentBtn}>
                    {props.text}
                </button>
            </div>
        </form>
    );
});

export default CommentForm;
