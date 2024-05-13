import { Route, Routes } from 'react-router-dom';
import Posts from './Posts';
import PostDetail from './PostDetail.jsx';
import PostCreate from './post-create';
import PostUpdate from './PostUpdate.jsx';

function index() {
    return (
        <Routes>
            <Route path='' element={<Posts />} />
            <Route path='create' element={<PostCreate />} />
            <Route path=':id' element={<PostDetail />} />
            <Route path=':id/update' element={<PostUpdate />} />
        </Routes>
    );
}

export default index;
