import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';

// page
import Login from './pages/login';
import Register from './pages/register';
import User from './pages/user';
import Posts from './pages/posts';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/user/*' element={<User />} />
                    <Route path='/posts/*' element={<Posts />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
