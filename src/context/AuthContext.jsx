import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();



    const login = (username, password) => {
        axios.post('http://localhost:3001/login', { username, password })
        .then(res => {
            const loggedInUser = {
                id: res.data.id,
                username: res.data.username,
            }

            setIsAuthenticated(true);
            setUser(loggedInUser);
            navigate('/chat');
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, login }}>
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