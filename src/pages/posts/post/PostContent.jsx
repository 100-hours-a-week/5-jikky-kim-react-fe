import React from 'react';
import style from './Post.module.css';
import { formatCount } from '../../../utils/utils';

const PostContent = ({ post }) => (
    <div className={style.content}>
        <img className={style.post_image} alt='게시글 사진' src={post.post_image}></img>
        <div className={style.post_content}>{post.content}</div>
        <div className={style.view_co_btn}>
            <div>
                <div id='count-view' className='num'>
                    {formatCount(post.count_view)}
                </div>
                <div>조회수</div>
            </div>
            <div>
                <div id='count-comment' className='num'>
                    {formatCount(post.count_comment)}
                </div>
                <div>댓글</div>
            </div>
        </div>
    </div>
);

export default PostContent;
