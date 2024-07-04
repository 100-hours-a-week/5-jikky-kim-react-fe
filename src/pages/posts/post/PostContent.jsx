import React from 'react';
import style from './Post.module.css';
import { formatCount } from '../../../utils/utils';

const PostContent = ({ post }) => {
    const { postImage, content, countView, countComment } = post;
    return (
        <div className={style.content}>
            <img className={style.post_image} alt='게시글 사진' src={postImage}></img>
            <div className={style.post_content}>{content}</div>
            <div className={style.view_co_btn}>
                <div>
                    <div id='count-view' className='num'>
                        {formatCount(countView)}
                    </div>
                    <div>조회수</div>
                </div>
                <div>
                    <div id='count-comment' className='num'>
                        {formatCount(countComment)}
                    </div>
                    <div>댓글</div>
                </div>
            </div>
        </div>
    );
};
export default PostContent;
