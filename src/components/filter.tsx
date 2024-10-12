import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

// Definindo o tipo Skill diretamente no componente
interface Skill {
  id: number;
  nome: string;
  descricao: string;
  tecnologia: string;
  nivel: string;
}

interface FilterProps {
  skills: Skill[];  // Tipo correto de skills
  setFilteredSkills: (skills: Skill[]) => void;  // Função para atualizar as skills filtradas
}

const Filter: React.FC<FilterProps> = ({ skills, setFilteredSkills }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');  // Estado da pesquisa

  // Função para filtrar as skills
  useEffect(() => {
    const filtered = skills.filter(skill =>
      skill.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.tecnologia.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSkills(filtered);  // Atualiza as skills filtradas
  }, [searchTerm, skills, setFilteredSkills]);

  return (
    <InputGroup>
      <InputGroup.Text id="search-icon">
        <i className="bi bi-search" /> {/* Ícone de lupa */}
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Pesquisar por nome, descrição ou tecnologia..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  // Atualiza o termo de pesquisa
        aria-label="Pesquisar skills"
        aria-describedby="search-icon"
      />
    </InputGroup>
  );
};

export default Filter;
