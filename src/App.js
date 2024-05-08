import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';

// page
import Login from './pages/Login';
import Register from './pages/Register';
import Posts from './pages/Posts';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/posts' element={<Posts />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
