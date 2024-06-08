import React from 'react';
import style from './Post.module.css';
import { formatCount } from '../../../utils/utils';

const PostContent = ({ post }) => {
    const { post_image, content, count_view, count_comment } = post;
    return (
        <div className={style.content}>
            <img className={style.post_image} alt='게시글 사진' src={post_image}></img>
            <div className={style.post_content}>{content}</div>
            <div className={style.view_co_btn}>
                <div>
                    <div id='count-view' className='num'>
                        {formatCount(count_view)}
                    </div>
                    <div>조회수</div>
                </div>
                <div>
                    <div id='count-comment' className='num'>
                        {formatCount(count_comment)}
                    </div>
                    <div>댓글</div>
                </div>
            </div>
        </div>
    );
};
export default PostContent;
