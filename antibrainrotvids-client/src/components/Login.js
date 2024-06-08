import React, { useState } from 'react';
import { login } from '../services/api';

const Login = ({ setToken, setUsername }) => {
    const [username, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            setToken(data.access_token);
            setUsername(data.username);
            alert('Logged in successfully!');
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-background-light p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Login</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Username"
                className="w-full p-2 mb-4 bg-background-dark text-white rounded-lg"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 mb-4 bg-background-dark text-white rounded-lg"
            />
            <button onClick={handleLogin} className="w-full p-2 bg-futuristic-blue rounded-lg hover:bg-dark-blue">
                Login
            </button>
        </div>
    );
};

export default Login;
