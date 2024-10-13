import { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination, Button } from 'react-bootstrap';
import CardSkills from './cardSkills';
import RegisterModal from './registerModal';
import Filter from '../components/filter';  
import { getSkills } from '../services/apiService';

interface Skill {
  id: number;
  nome: string;
  descricao: string;
  tecnologia: string;
  nivel: string;
}

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const skillsPerPage = 8;
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  const fetchSkills = async () => {
    try {
      const data: Skill[] = await getSkills();
      setSkills(data);
      setFilteredSkills(data);
    } catch (error) {
      console.error('Erro ao buscar habilidades:', error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDeleteSkill = (skillId: number) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));
    setFilteredSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));
  };

  const handleEditSkill = (updatedSkill: Skill) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill))
    );
    setFilteredSkills((prevSkills) =>
      prevSkills.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill))
    );
  };

  const handleSkillAdded = () => {
    fetchSkills();
    const totalPages = Math.ceil(skills.length / skillsPerPage);
    setCurrentPage(totalPages);
  };

  const indexOfLastSkill = currentPage * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
  const currentSkills = filteredSkills.slice(indexOfFirstSkill, indexOfLastSkill);
  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);

  return (
    <Container fluid className="d-flex flex-column align-items-center">
      <div className="d-flex flex-column align-items-center mb-2">
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '0.1rem', fontWeight: 'bold', color: '#2a4e6d', marginBottom: '0.25rem' }}>
          Bem Vindo a Lista de habilidades da Neki!
        </h1>

        <div className="d-flex justify-content-center align-items-center">
          <Button
            variant="primary"
            onClick={() => setShowRegisterModal(true)}
            className="me-3"
          >
            Adicionar Nova Skill
          </Button>

          <div style={{ minWidth: '300px' }}>
            <Filter skills={skills} setFilteredSkills={setFilteredSkills} />
          </div>
        </div>
      </div>

      <Row className="justify-content-center mt-4" style={{ width: '100%' }}>
        {currentSkills.map((skill) => (
          <Col xs={12} sm={6} md={3} className="d-flex justify-content-center mb-4" key={skill.id}>
            <CardSkills skill={skill} onDelete={handleDeleteSkill} onEdit={handleEditSkill} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>

      <RegisterModal show={showRegisterModal} handleClose={() => setShowRegisterModal(false)} handleSubmit={handleSkillAdded} />
    </Container>
  );
};

export default Layout;
