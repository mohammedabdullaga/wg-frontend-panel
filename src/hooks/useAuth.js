import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken as storeToken, clearToken } from '../auth/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken());
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      storeToken(token);
    } else {
      clearToken();
    }
  }, [token]);

  const login = t => {
    setTokenState(t);
  };
  const logout = () => {
    setTokenState(null);
    clearToken();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

