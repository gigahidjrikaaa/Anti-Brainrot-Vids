import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Preferences from './components/Preferences';
import Recommendations from './components/Recommendations';
import './index.css'; // Import the Tailwind CSS file

function App() {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

    return (
        <Router>
            <div className="min-h-screen bg-background-dark text-white">
                <nav className="bg-dark-blue p-4 shadow-lg">
                    <div className="container mx-auto flex justify-between items-center">
                        <div>
                            <Link to="/register" className="mr-4 hover:text-futuristic-blue">Register</Link>
                            <Link to="/login" className="mr-4 hover:text-futuristic-blue">Login</Link>
                            <Link to="/preferences" className="mr-4 hover:text-futuristic-blue">Preferences</Link>
                            <Link to="/recommendations" className="hover:text-futuristic-blue">Recommendations</Link>
                        </div>
                        {username && <div>Welcome, {username}!</div>}
                    </div>
                </nav>
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
                        <Route path="/preferences" element={<Preferences token={token} />} />
                        <Route path="/recommendations" element={<Recommendations token={token} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
