import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Preferences from './components/Preferences';
import Recommendations from './components/Recommendations';

function App() {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

    return (
        <Router>
            <div>
                <nav>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/preferences">Preferences</Link>
                    <Link to="/recommendations">Recommendations</Link>
                    {username && <span>Welcome, {username}!</span>}
                </nav>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
                    <Route path="/preferences" element={<Preferences token={token} />} />
                    <Route path="/recommendations" element={<Recommendations token={token} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
