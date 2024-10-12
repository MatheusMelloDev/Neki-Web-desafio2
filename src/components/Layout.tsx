import  { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination, Button } from 'react-bootstrap';
import CardSkills from './cardSkills';
import RegisterModal from './registerModal';
import Filter from '../components/filter';  // Importe o componente de filtro
import { getSkills } from '../services/apiService';

// Definindo o tipo Skill diretamente no componente
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
  const [skills, setSkills] = useState<Skill[]>([]);  // Tipo correto de skills
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);  // Tipo correto de skills filtradas
  const [currentPage, setCurrentPage] = useState<number>(1);  // Tipo correto de número de página
  const skillsPerPage = 8;
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);  // Controle do modal

  // Função para buscar as skills da API
  const fetchSkills = async () => {
    try {
      const data: Skill[] = await getSkills();  // Defina o tipo retornado pela API
      setSkills(data);  // Atualiza as skills com o retorno da API
      setFilteredSkills(data);  // Inicialmente, todas as skills são exibidas
    } catch (error) {
      console.error('Erro ao buscar habilidades:', error);
    }
  };

  useEffect(() => {
    fetchSkills();  // Busca as skills ao montar o componente
  }, []);

  // Função para deletar uma skill
  const handleDeleteSkill = (skillId: number) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));  // Atualiza o estado ao deletar
    setFilteredSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));  // Atualiza a lista filtrada
  };

  // Função para editar uma skill
  const handleEditSkill = (updatedSkill: Skill) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill))  // Atualiza a skill editada
    );
    setFilteredSkills((prevSkills) =>
      prevSkills.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill))  // Atualiza a lista filtrada
    );
  };

  // Função para adicionar uma skill
  const handleSkillAdded = () => {
    fetchSkills();  // Recarrega as skills após adicionar
    const totalPages = Math.ceil(skills.length / skillsPerPage);
    setCurrentPage(totalPages);  // Vai para a última página
  };

  // Paginação
  const indexOfLastSkill = currentPage * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
  const currentSkills = filteredSkills.slice(indexOfFirstSkill, indexOfLastSkill);  // Skills paginadas
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
            className="me-3"  // Margem à direita
          >
            Adicionar Nova Skill
          </Button>

          {/* Barra de pesquisa */}
          <div style={{ minWidth: '300px' }}>
            <Filter skills={skills} setFilteredSkills={setFilteredSkills} />
          </div>
        </div>
      </div>

      {/* Renderização das skills paginadas */}
      <Row className="justify-content-center mt-4" style={{ width: '100%' }}>
        {currentSkills.map((skill, index) => (
          <Col xs={12} sm={6} md={3} className="d-flex justify-content-center mb-4" key={index}>
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
