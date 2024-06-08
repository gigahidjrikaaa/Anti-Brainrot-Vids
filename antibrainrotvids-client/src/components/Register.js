import React, { useState } from 'react';
import { register } from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await register(username, password);
            alert('Registered successfully!');
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-background-light p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Register</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button onClick={handleRegister} className="w-full p-2 bg-futuristic-blue rounded-lg hover:bg-dark-blue">
                Register
            </button>
        </div>
    );
};

export default Register;
