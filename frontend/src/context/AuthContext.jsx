import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, signup as signupService, logout as logoutService } from '../services/auth.service';
import { getProfile } from '../services/user.service';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    await loginService(email, password);
    const userData = await getProfile();
    setUser(userData);
  };

  const signup = async (userData) => {
    await signupService(userData);
    await loginService(userData.email, userData.password);
    const userDataProfile = await getProfile();
    setUser(userDataProfile);
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
