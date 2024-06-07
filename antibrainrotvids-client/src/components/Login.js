import React, { useState } from 'react';
import { login } from '../services/api';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            setToken(data.access_token);
            alert('Logged in successfully!');
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;