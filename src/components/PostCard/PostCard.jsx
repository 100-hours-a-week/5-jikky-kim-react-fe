import React from 'react';
import './PostCard.css';
import { Link } from 'react-router-dom';
import { formatCount, titleSlice } from '../../utils/utils';

const Post = (props) => {
    const { post_id, title, created_at, creator, count } = props;
    return (
        <>
            <Link to={'/post/' + post_id} className='post'>
                <div className='post-title'>{titleSlice(title)}</div>
                <div className='post-mid'>
                    <div className='post-mid-l'>
                        <div className='count-like'>좋아요 {formatCount(count.like)}</div>
                        <div className='count-comment'>댓글 {formatCount(count.comment)}</div>
                        <div className='count-view'>조회수 {formatCount(count.view)}</div>
                    </div>
                    <div className='created-at'>{created_at}</div>
                </div>
                <div className='line'></div>
                <div className='post-creator'>
                    <img className='avatar' alt='avatar' src={creator.avatar} />
                    <div className='creator'>{creator.nickname}</div>
                </div>
            </Link>
        </>
    );
};

export default Post;
