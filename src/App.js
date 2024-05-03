import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Login';

function App() {
    return (
        <>
            <Header />
            <Router>
                <Routes>
                    {/* <Route  path="/" element={Home} /> */}
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
