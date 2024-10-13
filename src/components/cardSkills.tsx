import { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { deleteSkill, updateSkillInfo, updateSkillPhoto } from '../services/apiService';

interface Skill {
  id: number;
  nome: string;
  descricao: string;
  tecnologia: string;
  nivel: string;
  photo?: string;
}

interface CardSkillsProps {
  skill: Skill;
  onDelete: (id: number) => void;
  onEdit: (updatedSkill: Skill) => void;
}

const CardSkills: React.FC<CardSkillsProps> = ({ skill, onDelete, onEdit }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [editedSkill, setEditedSkill] = useState<Skill>({ ...skill });

  const skillNames = ['Desenvolvedor Backend', 'Desenvolvedor FrontEnd', 'Desenvolvedor FullStack'];
  const skillDescriptions = ['Desenvolvedor API', ' Designer UI/UX', 'Desing de Banco de Dados'];
  const skillTechnologies = ['Java', 'React', 'Node.js', 'SQL'];
  const skillLevels = ['Básico', 'Intermediário', 'Avançado'];

  const handleDelete = async () => {
    try {
      if (!skill || !skill.id) {
        console.error('Erro: Skill ID está indefinido.');
        return;
      }
      await deleteSkill(skill.id);
      onDelete(skill.id);
      setShowConfirmModal(false); 
    } catch (error) {
      console.error('Erro ao deletar skill:', error);
    }
  };

  const handleEdit = async () => {
    const updatedSkill = {
      id: editedSkill.id,
      nome: editedSkill.nome,
      descricao: editedSkill.descricao,
      tecnologia: editedSkill.tecnologia,
      nivel: editedSkill.nivel,
    };
  
    try {
      await updateSkillInfo(updatedSkill.id, updatedSkill);
      onEdit(updatedSkill); 
      setShowEditModal(false); 
    } catch (error) {
      console.error("Erro ao editar skill:", error);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const updatedSkill = await updateSkillPhoto(skill.id, file);
        setEditedSkill({ ...editedSkill, photo: updatedSkill.photo });
        onEdit(updatedSkill);
      } catch (error) {
        console.error('Erro ao atualizar a foto:', error);
      }
    }
  };

  return (
    <>
      <Card className="mb-4" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)', width: "20rem" }}>
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Card.Img
            variant="top"
            src={`data:image/jpeg;base64,${editedSkill.photo}`}
            alt={skill.nome}
            style={{ objectFit: "contain", width: "100%", height: "18rem", background: "#356085" }}
          />
          {hovered && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
              />
              <i className="bi bi-pencil-square" 
                style={{ color: 'white', fontSize: '2rem', position: 'absolute', pointerEvents: 'none' }}>
              </i>
            </div>
          )}
        </div>
        <Card.Body>
          <Card.Title>{skill.nome}</Card.Title>
          <Card.Text>Desc: {skill.descricao}</Card.Text>
          <Card.Text>Tec: {skill.tecnologia}</Card.Text>
          <Card.Text>Nível: {skill.nivel}</Card.Text>
          <div className="d-flex justify-content-between">
            <Button variant="warning" onClick={() => setShowEditModal(true)} style={{ border: "none" }}>
              <i className="bi bi-pencil-square" style={{ color: "white" }}></i>
            </Button>
            <Button
              variant="danger"
              onClick={() => setShowConfirmModal(true)}  
              style={{ border: "none" }}
            >
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal de Edição */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                as="select"
                name="nome"
                value={editedSkill.nome}
                onChange={(e) => setEditedSkill({ ...editedSkill, nome: e.target.value })}
              >
                <option value="">Selecione o nome</option>
                {skillNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="select"
                name="descricao"
                value={editedSkill.descricao}
                onChange={(e) => setEditedSkill({ ...editedSkill, descricao: e.target.value })}
              >
                <option value="">Selecione a descrição</option>
                {skillDescriptions.map((desc, index) => (
                  <option key={index} value={desc}>
                    {desc}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Tecnologia</Form.Label>
              <Form.Control
                as="select"
                name="tecnologia"
                value={editedSkill.tecnologia}
                onChange={(e) => setEditedSkill({ ...editedSkill, tecnologia: e.target.value })}
              >
                <option value="">Selecione a tecnologia</option>
                {skillTechnologies.map((tech, index) => (
                  <option key={index} value={tech}>
                    {tech}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nível</Form.Label>
              <Form.Control
                as="select"
                name="nivel"
                value={editedSkill.nivel}
                onChange={(e) => setEditedSkill({ ...editedSkill, nivel: e.target.value })}
              >
                <option value="">Selecione o nível</option>
                {skillLevels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>

     
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        size="sm"
        centered
      >
        <Modal.Body className="text-center">
          <p>Tem certeza de que deseja deletar?</p>
          <div className="d-flex justify-content-center">
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)} className="me-2">
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete} style={{background:"#D00000"}}>
              Deletar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardSkills;
