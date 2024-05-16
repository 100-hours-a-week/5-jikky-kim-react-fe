import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { activateButton, deactivateButton, handleInputChange } from '../../../utils/utils';
import { openModal, closeModal } from '../../../utils/modal';
import api from '../../../utils/api';

import Toast from '../../../components/Toast/Toast';

import ControlButton from './ControlButton';

import style from './Post.module.css';
import Modal from '../../../components/Modal/Modal';
import Form from './Form';

function Post() {
    const navigate = useNavigate();
    const location = useLocation();

    const toastMessage = useRef();
    const postModalRefs = {
        modal: useRef(),
        overlay: useRef(),
    };
    const commentModalRefs = {
        modal: useRef(),
        overlay: useRef(),
    };

    const commentRefs = {
        commentForm: useRef(),
        commentBtn: useRef(),
    };
    // const commentForm = useRef();
    // const commentBtn = useRef();

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

    // 댓글 삭제를 위한 상태
    const [commentId, setCommentId] = useState('');

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

    // 게시글 수정 버튼 클릭
    const updatePostButtonClickHandler = () => {
        navigate(`/posts/${post_id}/update`);
    };

    // 게시글 삭제 버튼 클릭
    const deletePostButtonClickHandler = () => {
        openModal(postModalRefs.modal, postModalRefs.overlay);
    };

    // 댓글 수정 버튼 클릭
    const updateCommentButtonClickHandler = (comment, comment_id) => {
        setCommentId(comment_id);
        setCommentInput({ comment });
        setIsCreateMode(false);
    };

    // 댓글 삭제 버튼 클릭
    const deleteCommentButtonClickHandler = (comment_id) => {
        setCommentId(comment_id);
        openModal(commentModalRefs.modal, commentModalRefs.overlay, comment_id);
    };

    // 게시물 삭제 확인 버튼 클릭
    const postModalOkClickHandler = async () => {
        const res = await api.delete(`/posts/${post_id}`);
        console.log(res);
        if (res.message === 'post deleted successfully') {
            // TOAST 출력
            setMessage('삭제 완료');
            setActive('toast-active');
            setTimeout(function () {
                closeModal(postModalRefs.modal, postModalRefs.overlay);
                setActive('toast');
                return navigate('/posts');
            }, 1000);
        }
    };

    // 게시글 삭제 취소 버튼 클릭
    const postModalCancelClickHandler = () => {
        closeModal(postModalRefs.modal, postModalRefs.overlay);
    };

    // 댓글 삭제 확인 버튼 클릭
    const commentModalOkClickHandler = async () => {
        const res = await api.delete(`/posts/${post_id}/comment/${commentId}`);
        console.log(res);
        if (res.message === 'comment deleted successfully') {
            // TOAST 출력
            setMessage('댓글 삭제 완료');
            setActive('toast-active');
            setTimeout(function () {
                closeModal(commentModalRefs.modal, commentModalRefs.overlay);
                setActive('toast');
                return fetchPost();
            }, 1000);
        }
    };

    // 댓글 삭제 취소 버튼 클릭
    const commentModalCancelClickHandler = () => {
        closeModal(commentModalRefs.modal, commentModalRefs.overlay);
    };

    const [isCreateMode, setIsCreateMode] = useState(true);

    // 댓글 등록 버튼 클릭
    const createCommentHandler = async (event) => {
        console.log('createCommentHandler!');
        event.preventDefault();
        const res = await api.post(`/posts/${post_id}/comment`, { comment: commentInput.comment });
        console.log(res);
        setCommentInput({ comment: '' });
        if (res.message === 'comment created successfully') {
            setMessage('댓글 작성 완료');
            setActive('toast-active');
            setTimeout(function () {
                setActive('toast');
                // TODO : 댓글만 다시 불러오게 최적화
                return fetchPost();
            }, 1000);
        }
    };

    // 댓글 수정 버튼 (입력폼에 있는) 클릭
    const updateCommentHandler = async (event) => {
        event.preventDefault();
        const res = await api.patch(`/posts/${post_id}/comment/${commentId}`, { comment: commentInput.comment });
        console.log(res);
        // TODO : 등록완료후 입력 댓글 지우기 => 현재 안 비워짐
        setCommentInput({ comment: '' });
        commentRefs.commentBtn.current.innerHTML = '댓글 등록';
        if (res.message === 'comment updated successfully') {
            setMessage('댓글 수정 완료');
            setActive('toast-active');

            setTimeout(function () {
                setActive('toast');
                // TODO : 댓글만 다시 불러오게 최적화
                return fetchPost();
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
    }, [isValid]);

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
                                updateButtonClickHandler={updatePostButtonClickHandler}
                                deleteButtonClickHandler={deletePostButtonClickHandler}
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
                    {isCreateMode ? (
                        <Form
                            onSubmitHandler={createCommentHandler}
                            onChangeHandler={(event) => handleInputChange(event, setCommentInput)}
                            commentInput
                            ref={commentRefs}
                            text={'댓글 등록'}
                        />
                    ) : (
                        <Form
                            onSubmitHandler={updateCommentHandler}
                            onChangeHandler={(event) => handleInputChange(event, setCommentInput)}
                            commentInput
                            ref={commentRefs}
                            text={'댓글 수정'}
                        />
                    )}
                    <div className={style.comment_wrap}>
                        {post.comments?.map((comment) => {
                            return (
                                <div className={style.comments} key={comment.comment_id}>
                                    <div className={style.comment_box}>
                                        <div className={style.comment_item}>
                                            <img className={style.avatar} alt='avatar' src={comment.creator.avatar} />
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
                                            updateButtonClickHandler={() =>
                                                updateCommentButtonClickHandler(comment.content, comment.comment_id)
                                            }
                                            deleteButtonClickHandler={() =>
                                                deleteCommentButtonClickHandler(comment.comment_id)
                                            }
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Modal
                ref={postModalRefs}
                modalOkClickHandler={postModalOkClickHandler}
                modalCancelClickHandler={postModalCancelClickHandler}
                text1={'게시글을 삭제하시겠습니까?'}
                text2={'삭제한 내용은 복구 할 수 없습니다.'}
            />
            <Modal
                ref={commentModalRefs}
                modalOkClickHandler={commentModalOkClickHandler}
                modalCancelClickHandler={commentModalCancelClickHandler}
                text1={'댓글을 삭제하시겠습니까?'}
                text2={'삭제한 내용은 복구 할 수 없습니다.'}
            />

            <Toast ref={toastMessage} active={active}>
                {message}
            </Toast>
        </>
    );
}

export default Post;
