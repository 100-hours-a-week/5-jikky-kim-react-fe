import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { activateButton, deactivateButton, handleInputChange } from '../../../utils/utils';
import api from '../../../utils/api';

import Toast from '../../../components/Toast/Toast';

import ControlButton from './ControlButton';

import style from './Post.module.css';

function Post() {
    const navigate = useNavigate();
    const location = useLocation();

    const toastMessage = useRef();
    const commentForm = useRef();

    const [active, setActive] = useState('toast');
    const [message, setMessage] = useState('');
    const [post, setPost] = useState({
        title: '',
        post_image: '',
        content: '',
        comments: [],
        count_like: '',
        count_comment: '',
        count_view: '',
        created_at: '',
        creator_nickname: '',
        creator_avatar: '',
        creator_id: '',
    });

    const [commentInput, setCommentInput] = useState({
        comment: '',
    });

    const isValid = commentInput.comment;

    // TODO : 전역 상태로 리팩토링
    const [userId, setUserId] = useState('');

    const post_id = location.pathname.split('/')[2];

    const fetchPost = async () => {
        const res = await api.get(`/posts/${post_id}`);
        const { title, post_image, content, comments, count, created_at, creator } = res.post;
        setPost({
            title,
            post_image,
            content,
            comments,
            count_like: count.like,
            count_comment: count.comment,
            count_view: count.view,
            created_at,
            creator_nickname: creator.nickname,
            creator_avatar: creator.avatar,
            creator_id: creator.user_id,
        });
    };

    const fetchUser = async () => {
        const res = await api.get('/users/change');
        setUserId(res.user.user_id);
    };

    const navigateToUpdatePage = () => {
        navigate(`/posts/${post_id}/update`);
    };

    const deletePost = async () => {
        const res = await api.delete(`/posts/${post_id}`);
        console.log(res);
        if (res.message == 'post deleted successfully') {
            // TOAST 출력
            setMessage('삭제 완료');
            setActive('toast-active');
            setTimeout(function () {
                setActive('toast');
                return navigate('/posts');
            }, 1000);
        }
    };

    const createCommentHandler = async (event) => {
        event.preventDefault();

        const res = await api.post(`/posts/${post_id}/comment`, { comment: commentInput.comment });
        console.log(res);
        if (res.message === 'comment created successfully') {
            // TOAST 출력
            setMessage('댓글 작성 완료');
            setActive('toast-active');
            setTimeout(function () {
                setActive('toast');
                // return fetchPost();
            }, 1000);
        }
    };

    useEffect(() => {
        fetchPost();
        fetchUser();
    }, []);

    useEffect(() => {
        // TODO : 비속어 필터링 기능 고려 ( 직접 구현 or gpt api )
        // NOTE : gpt로 할거면 교정 교열도 시도? => 사용자 자유도 ? 커뮤니티 정체성
        if (isValid) {
            return activateButton('comment-create-btn');
        }
        deactivateButton('comment-create-btn');
    });

    return (
        <>
            <div className={style.section}>
                <div className={style.post}>
                    <div className={style.post_title}>{post.title}</div>
                    <div className={style.post_header}>
                        <div className={style.post_header_item}>
                            <img id='avatar' className={style.avatar} alt='profile' src={post.creator_avatar}></img>
                            <div id='creator' className={style.creator}>
                                {post.creator_nickname}
                            </div>
                            <div id='post-created-at' className={style.date}>
                                {post.created_at}
                            </div>
                        </div>
                        {/* 로그인 한 유저 게시물 일 때만 렌더링 */}
                        {userId === post.creator_id && (
                            <ControlButton
                                updateButtonClickHandler={navigateToUpdatePage}
                                deleteButtonClickHandler={deletePost}
                            />
                        )}
                    </div>
                    <div className='line'></div>
                    <div className={style.content}>
                        <img className={style.post_image} alt='게시글 사진' src={post.post_image}></img>
                        <div className={style.post_content}>{post.content}</div>
                        <div className={style.view_co_btn}>
                            <div>
                                <div id='count-view' className='num'>
                                    {post.count_view}
                                </div>
                                <div>조회수</div>
                            </div>
                            <div>
                                <div id='count-comment' className='num'>
                                    {post.count_comment}
                                </div>
                                <div>댓글</div>
                            </div>
                        </div>
                    </div>
                    <div className='line'></div>
                    <form className={style.form} onSubmit={createCommentHandler} ref={commentForm}>
                        <textarea
                            type='text'
                            name='comment'
                            className={style.comment}
                            placeholder='댓글을 남겨주세요!'
                            value={commentInput.comment}
                            onChange={(event) => handleInputChange(event, setCommentInput)}
                        />
                        <div className='line'></div>
                        <div className={style.btn_wrapper}>
                            <button id='comment-create-btn' type='submit' className={style.comment_btn}>
                                댓글 등록
                            </button>
                        </div>
                    </form>

                    <div className={style.comment_wrap}>
                        {post.comments?.map((comment) => {
                            return (
                                <div className={style.comments} key={comment.comment_id}>
                                    <div className={style.comment_box}>
                                        <div className={style.comment_item}>
                                            <img
                                                className={style.avatar}
                                                alt='avatar'
                                                src={comment.creator.avatar}
                                            ></img>
                                            <div className={`${style.creator} ${style.comment_creator}`}>
                                                {comment.creator.nickname}
                                            </div>
                                            <div className={`${style.date} ${style.comment_created_at}`}>
                                                {comment.created_at}
                                            </div>
                                        </div>
                                        <div className={style.comment_content}>{comment.content}</div>
                                    </div>
                                    {/* 로그인 한 유저 댓굴 일 때만 렌더링 */}
                                    {userId === comment.creator.user_id && (
                                        <ControlButton
                                            updateButtonClickHandler={() => {}}
                                            deleteButtonClickHandler={() => {}}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div id='overlay1' className={style.overlay1}>
                <div id='del-modal' className={style.del_modal}>
                    <div className={style.del_modal_body}>
                        <div className={style.modal_title}>게시글을 삭제하시겠습니까?</div>
                        <div className={style.modal_message}>삭제한 내용은 복구 할 수 없습니다.</div>
                        <div className={style.modal_sel_btn}>
                            <button id='del-x' className={style.btn_cancel}>
                                취소
                            </button>
                            <button id='del-o' className={style.btn_ok}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id='overlay2' className={style.overlay1}>
                <div id='del-comment-modal' className={style.del_modal}>
                    <div id='del-modal-body2' className={style.del_modal_body}>
                        <div className={style.modal_title}>댓글을 삭제하시겠습니까?</div>
                        <div className={style.modal_message}>삭제한 내용은 복구 할 수 없습니다.</div>
                        <div className={style.modal_sel_btn}>
                            <button id='del-comment-x' className={style.btn_cancel}>
                                취소
                            </button>
                            <button id='del-comment-o' className={style.btn_ok}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Toast ref={toastMessage} active={active}>
                {message}
            </Toast>
        </>
    );
}

export default Post;
