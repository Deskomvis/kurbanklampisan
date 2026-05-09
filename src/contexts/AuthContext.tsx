import React, { createContext, useContext, useState, ReactNode } from 'react';

const SESSION_KEY = 'klampisan_admin_auth';
// PIN disimpan sebagai hash sederhana — jangan simpan plaintext di production
const VALID_HASH = btoa('135238');

interface AuthContextType {
  isAuthenticated: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === VALID_HASH;
  });

  const login = (pin: string): boolean => {
    if (btoa(pin) === VALID_HASH) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_KEY, VALID_HASH);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
