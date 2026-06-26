import React, { useState, useEffect } from 'react';
import Backendless from '../configs/backendless.config';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Backendless.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Backendless.UserService.getCurrentUser()
      .then((currentUser) => {
        setUser(currentUser as Backendless.User);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const loggedInUser = await Backendless.UserService.login(email, pass, true);
      setUser(loggedInUser);
      setLoading(false);
      return loggedInUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await Backendless.UserService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};