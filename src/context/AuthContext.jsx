import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    const login = async (username, password) => {
        try {
            const result = await axios.post('https://chatmultiusers-back-production.up.railway.app/login', { username, password });
            const loggedInUser = {
                id: result.data.id,
                username: username,
            };
            console.log('Usuário logado com sucesso!', loggedInUser);
            setIsAuthenticated(true);
            setUser(loggedInUser);
            navigate('/chat');
        } catch (error) {
            console.error('Login failed:', error.response.data.message || 'Unexpected error');
        }
    }
    const socket = isAuthenticated ? io('https://chatmultiusers-back-production.up.railway.app', { query: { userId: user.id } }) : null;

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, socket }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };