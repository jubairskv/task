import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        AuthService.register(username, email, password, role).then(
            () => {
                AuthService.login(email, password).then(
                    () => {
                        navigate('/dashboard'); // Navigate to a protected route after login
                    },
                    (loginError) => {
                        console.log('Login after registration failed:', loginError);
                    }
                );
            },
            (error) => {
                console.log('Registration failed:', error);
            }
        );
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
            <div>
                <p>Already have an account?</p>
                <button onClick={navigateToLogin}>Login</button>
            </div>
        </div>
    );
};

export default Register;
