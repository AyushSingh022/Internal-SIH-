import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/index';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('sih_token');
    const savedUser = localStorage.getItem('sih_user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch { /* invalid saved user */ }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    localStorage.setItem('sih_token', res.data.token);
    localStorage.setItem('sih_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res;
  };

  const signup = async (data) => {
    const res = await authService.signup(data);
    localStorage.setItem('sih_token', res.data.token);
    localStorage.setItem('sih_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('sih_token');
    localStorage.removeItem('sih_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
