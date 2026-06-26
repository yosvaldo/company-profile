import { createContext, useContext } from 'react';
import Backendless from '../configs/backendless.config';

export interface AuthContextType {
  user: Backendless.User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<Backendless.User>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be nested inside an AuthProvider');
  return context;
}