import style from './Posts.module.css';
import PostCard from '../../components/PostCard/PostCard';
import api from '../../utils/api';
import { useState, useEffect, useRef, useCallback } from 'react';
import Info from './Info';
import Toast from '../../components/Toast/Toast';
import Loading from '../../components/Loading/Loading';

const Posts = () => {
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [active, setActive] = useState('toast');

    const toastMessage = useRef();
    const timerRef = useRef(0);

    const limit = 5;
    const [postList, setPostList] = useState([]);
    const fetchPostList = async (params) => {
        try {
            const data = await api.get(`/posts`, params);
            const posts = data.posts;
            setPostList((prev) => [...prev, ...posts]);
            if (posts.length === 0) {
                setHasMore(false);
                // toast 렌더링
                setActive('toast-active');
                setTimeout(function () {
                    setActive('toast');
                }, 1000);
            }
            return posts;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPostList({ page, limit });
        setIsFetching(false);
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [page, limit]);

    const loadingDiv = useRef();
    const infiniteScroll = useCallback(() => {
        // 무한스크롤 데이터 로딩
        const loading = {
            start: () => {
                // @로딩 시작
                loadingDiv.current.style.display = 'block';
            },
            end: () => {
                // @로딩 종료
                loadingDiv.current.style.display = 'none';
            },
        };
        const windowScrollHandler = () => {
            if (isFetching || !hasMore) return;

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight + 10) {
                // 디바운싱
                clearTimeout(timerRef.current);
                loading.start();
                // NOTE : 애니매이션 보여주려고 1초 지연 결어 놓음. 필요시 삭제
                timerRef.current = setTimeout(() => {
                    setPage((prev) => prev + 1);
                    loading.end();
                }, 500);
            }
        };
        window.addEventListener('scroll', windowScrollHandler);
        // cleanup 함수를 반환하여 이벤트 리스너를 제거
        return () => {
            window.removeEventListener('scroll', windowScrollHandler);
            clearTimeout(timerRef.current);
        };
    }, [hasMore, isFetching]);

    useEffect(() => {
        infiniteScroll();
    }, [infiniteScroll]);

    return (
        <div id='posts' className={style.posts}>
            <div id='post-wrapper' className={style.post_wrapper}>
                <Info />
                <div id='btn-wrapper' className={style.btn_wrapper}>
                    <a href='http://localhost:3000/post/create'>
                        <button id='go-upload' className={style.go_upload}>
                            게시물 작성
                        </button>
                    </a>
                </div>
                <div className='post_list'>
                    {postList && postList.map((post) => <PostCard key={post.post_id} {...post} />)}
                </div>
                <Loading ref={loadingDiv} />
                <Toast id='toast-message' ref={toastMessage} active={active}>
                    더 이상 불러올 게시물이 없습니다.
                </Toast>
            </div>
        </div>
    );
};

export default Posts;
