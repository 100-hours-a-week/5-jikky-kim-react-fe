import { Route, Routes } from 'react-router-dom';
import UserUpdate from './user-update/UserUpdate';
import PasswordUpdate from './password-update/PasswordUpdate';
function index() {
    return (
        <Routes>
            <Route path='update' element={<UserUpdate />} />
            <Route path='password' element={<PasswordUpdate />} />
        </Routes>
    );
}

export default index;
