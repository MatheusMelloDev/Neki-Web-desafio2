import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';


interface Skill {
  id: number;
  nome: string;
  descricao: string;
  tecnologia: string;
  nivel: string;
}

interface FilterProps {
  skills: Skill[]; 
  setFilteredSkills: (skills: Skill[]) => void;  
}

const Filter: React.FC<FilterProps> = ({ skills, setFilteredSkills }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); 


  useEffect(() => {
    const filtered = skills.filter(skill =>
      skill.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.tecnologia.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSkills(filtered);  
  }, [searchTerm, skills, setFilteredSkills]);

  return (
    <InputGroup>
      <InputGroup.Text id="search-icon">
        <i className="bi bi-search" /> 
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Pesquisar por nome, descrição ou tecnologia..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  
        aria-label="Pesquisar skills"
        aria-describedby="search-icon"
      />
    </InputGroup>
  );
};

export default Filter;
