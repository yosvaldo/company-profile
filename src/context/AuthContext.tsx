import React, { createContext, useContext, useState, useEffect } from 'react';
import Backendless from 'backendless';

const APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID;
const API_KEY = import.meta.env.VITE_BACKENDLESS_API_KEY;

if (APP_ID && API_KEY) {
  Backendless.initApp(APP_ID, API_KEY);
}

interface AuthContextType {
  user: Backendless.User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<Backendless.User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be nested inside an AuthProvider');
  return context;
};