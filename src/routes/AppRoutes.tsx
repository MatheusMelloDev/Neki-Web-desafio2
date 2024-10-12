import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../screens/home'; // Ajuste o caminho correto
import Login from '../screens/login';
import Signup from '../screens/signup';
import PageNotFound from '../screens/pageNotFound';
import { AuthProvider } from '../context/authContext'; 
import ProtectedRoute from '../routes/ProtectedRoute';
import Header from '../components/header';
import Footer from '../components/footer';
import { getSkills } from '../services/apiService';

// Defina a interface Skill diretamente aqui
interface Skill {
  id: number;
  nome: string;
  descricao: string;
  tecnologia: string;
  nivel: string;
}

const AppRoutes: React.FC = () => {
  const [skillsData, setSkillsData] = useState<Skill[]>([]); // Definindo o tipo correto para o estado

  // Buscar as skills na montagem do componente
  useEffect(() => {
    const fetchSkills = async () => {
      const skills: Skill[] = await getSkills();  // Função para buscar skills
      setSkillsData(skills); // Agora o estado está tipado corretamente
    };

    fetchSkills();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Todas as rotas protegidas com layout completo */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home skills={skillsData} /> {/* Passa as skills diretamente para o Home */}
              </ProtectedRoute>
            }
          />

          {/* Página não encontrada */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
