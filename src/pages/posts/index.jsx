import { Route, Routes } from 'react-router-dom';
import Posts from './Posts';
import PostCreate from './post-create';
import Post from './post';
import PostUpdate from './post-update';

function index() {
    return (
        <Routes>
            <Route path='' element={<Posts />} />
            <Route path='create' element={<PostCreate />} />
            <Route path='/:id' element={<Post />} />
            <Route path='/:id/update' element={<PostUpdate />} />
        </Routes>
    );
}

export default index;
