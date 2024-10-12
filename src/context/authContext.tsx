import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginUserService, registerUser as registerUserService } from '../services/apiService';

interface AuthContextType {
  user: { email: string } | null;
  login: (loginData: { email: string; senha: string }) => Promise<void>;
  register: (registerData: { nome: string; email: string; senha: string; cargo: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const navigate = useNavigate();

  const login = async (loginData: { email: string; senha: string }) => {
    try {
      const response = await loginUserService(loginData.email, loginData.senha);
      setUser({ email: response.email });
      localStorage.setItem('token', response.token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (registerData: { nome: string; email: string; senha: string; cargo: string }) => {
    try {
      await registerUserService(registerData);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
