/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const TOKEN_KEY = 'rrh_token'; // Rapid Revision Hub

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem(TOKEN_KEY) || localStorage.getItem('educonnect_token') // migrate old key
  );
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(
    localStorage.getItem('rrh_is_guest') === 'true'
  );

  // Migrate old token key
  useEffect(() => {
    const oldToken = localStorage.getItem('educonnect_token');
    if (oldToken && !localStorage.getItem(TOKEN_KEY)) {
      localStorage.setItem(TOKEN_KEY, oldToken);
      localStorage.removeItem('educonnect_token');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('educonnect_token');
    localStorage.removeItem('rrh_is_guest');
    setToken(null);
    setUser(null);
    setIsGuest(false);
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchCurrentUser();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setLoading(false);
    }
  }, [token, fetchCurrentUser]);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    const { token: newToken, user: newUser } = res.data;
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.removeItem('rrh_is_guest');
    setToken(newToken);
    setUser(newUser);
    setIsGuest(false);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    return res.data;
  };

  const register = async (data) => {
    const res = await axios.post('/api/auth/register', data);
    const { token: newToken, user: newUser } = res.data;
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.removeItem('rrh_is_guest');
    setToken(newToken);
    setUser(newUser);
    setIsGuest(false);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    return res.data;
  };

  const loginAsGuest = () => {
    setIsGuest(true);
    localStorage.setItem('rrh_is_guest', 'true');
    setLoading(false);
  };

  const updateUser = (updatedUser) => setUser(updatedUser);

  return (
    <AuthContext.Provider value={{ user, token, loading, isGuest, login, register, loginAsGuest, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
