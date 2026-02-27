import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const TOKEN_KEY = 'wg_admin_token';
export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const navigate = useNavigate();
  useEffect(() => { if (token) localStorage.setItem(TOKEN_KEY, token); else localStorage.removeItem(TOKEN_KEY); }, [token]);
  const login = t => setToken(t);
  const logout = () => { setToken(null); navigate('/login'); };
  return { token, login, logout };
}
