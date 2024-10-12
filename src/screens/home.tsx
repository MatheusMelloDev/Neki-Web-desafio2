
import React, { useState, useEffect } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import RegisterModal from '../components/registerModal';
import CardSkills from '../components/cardSkills';
import RegisterButton from '../components/registerButton';
import Layout from '../components/Layout';

// Defina a interface Skill aqui também
interface Skill {
  id: number;
  nome: string;
  descricao: string;
  tecnologia: string;
  nivel: string;
}

interface HomeProps {
  skills: Skill[];  // Definindo o tipo da prop 'skills'
}

const Home: React.FC<HomeProps> = ({ skills }) => {
  const [localSkills, setLocalSkills] = useState<Skill[]>(skills); // Tipando corretamente o estado
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  useEffect(() => {
    setLocalSkills(skills);
  }, [skills]);

  const handleSubmit = (newSkill: Omit<Skill, 'id'>) => {
    setLocalSkills((prevSkills) => [...prevSkills, { ...newSkill, id: prevSkills.length + 1 }]);
    setMessage({ type: 'success', text: 'Skill cadastrada com sucesso!' });
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setLocalSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
  };

  const handleEdit = (updatedSkill: Skill) => {
    setLocalSkills((prevSkills) =>
      prevSkills.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill))
    );
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h2>Bem-vindo à aplicação de Skills</h2>
        {message && (
          <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
            {message.text}
          </Alert>
        )}
        <RegisterButton handleShowModal={() => setShowModal(true)} />
        <Row className="mt-4">
          {localSkills.length > 0 ? (
            localSkills.map((skill) => (
              <Col md={4} key={skill.id}>
                <CardSkills
                  skill={skill}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </Col>
            ))
          ) : (
            <p>Nenhuma skill cadastrada.</p>
          )}
        </Row>
        <RegisterModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
};

export default Home;
