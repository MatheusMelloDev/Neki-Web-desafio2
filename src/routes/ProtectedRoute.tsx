import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode; // Certificando que children é tipado como ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>; // Renderizando os elementos filhos se o usuário estiver autenticado
};

export default ProtectedRoute;
