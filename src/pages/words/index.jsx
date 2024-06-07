import { Route, Routes } from 'react-router-dom';
import Words from './Words';

const index = () => {
    return (
        <Routes>
            <Route path='' element={<Words />} />
        </Routes>
    );
};

export default index;
