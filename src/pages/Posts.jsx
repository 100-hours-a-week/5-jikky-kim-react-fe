import './Posts.css';
import PostCard from '../components/PostCard/PostCard';
import api from '../utils/api';
import { useState, useEffect, useRef } from 'react';

const Posts = () => {
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [hasMore, setHasMore] = useState(true);

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
                // toast로 안내
                toastMessage.current.innerHTML = '더 이상 불러올 게시물이 없습니다.';
                toastMessage.current.classList.add('active');
                setTimeout(function () {
                    toastMessage.current.classList.remove('active');
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

    // 무한스크롤 데이터 로딩
    const loading = {
        start: () => {
            // @로딩 시작
            const loading = document.querySelector('#loading');
            loading.style.display = 'block';
        },
        end: () => {
            // @로딩 종료
            const loading = document.querySelector('#loading');
            loading.style.display = 'none';
        },
    };

    useEffect(() => {
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
    }, []);

    return (
        <div id='posts'>
            <div id='post-wrapper'>
                <div id='post-info'>
                    <div className='post-info-text'>안녕하세요,</div>
                    <div className='post-info-text'>
                        아무 말 대잔치 <strong>게시판</strong> 입니다.
                    </div>
                </div>
                <div id='btn-wrapper'>
                    <a href='http://localhost:3000/post/create'>
                        <button id='go-upload'>게시물 작성</button>
                    </a>
                </div>
                <div className='post-list'>
                    {postList.map((post) => (
                        <PostCard key={post.post_id} {...post} />
                    ))}
                </div>
                <div id='loading'>
                    <div className='spinner'></div>
                </div>
                <div id='toast-message'></div>
                <div id='loading'>
                    <div className='spinner'></div>
                </div>
                <div id='toast-message' ref={toastMessage}></div>
            </div>
        </div>
    );
};

export default Posts;
