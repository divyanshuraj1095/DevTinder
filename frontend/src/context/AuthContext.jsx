import React, { createContext, useState, useEffect, useCallback } from 'react';
import { login as loginService, signup as signupService, logout as logoutService } from '../services/auth.service';
import { getProfile } from '../services/user.service';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const userData = await getProfile();
    setUser(userData);
    return userData;
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshUser();
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [refreshUser]);

  const login = async (email, password) => {
    await loginService(email, password);
    await refreshUser();
  };

  const signup = async (userData) => {
    await signupService(userData);
    await loginService(userData.email, userData.password);
    await refreshUser();
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
