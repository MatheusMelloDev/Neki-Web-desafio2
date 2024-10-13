import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { uploadPhoto, registerSkills } from '../services/apiService';


interface Skill {
  nome: string;
  descricao: string;
  tecnologia: string;
  nivel: string;
}


interface RegisterModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (newSkill: Omit<Skill, 'id'>) => void;
  initialData?: Skill; 
}

const RegisterModal: React.FC<RegisterModalProps> = ({ show, handleClose, handleSubmit, initialData }) => {
  const [newSkill, setNewSkill] = useState<Skill>({
    nome: '',
    descricao: '',
    tecnologia: '',
    nivel: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showError, setShowError] = useState(false);

 
  useEffect(() => {
    if (initialData) {
      setNewSkill({ ...initialData });
    }
  }, [initialData]);

  const skillNames = ['Desenvolvedor Backend', 'Desenvolvedor FrontEnd', 'Desenvolvedor FullStack'];
  const skillDescriptions = ['Desenvolvedor API', ' Designer UI/UX', 'Desing de Banco de Dados'];
  const skillTechnologies = ['Java', 'React', 'Node.js', 'SQL'];
  const skillLevels = ['Básico', 'Intermediário', 'Avançado'];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files ? e.target.files[0] : null);
  };

  const validateForm = () => {
    const validationErrors: { [key: string]: string } = {};
    if (!newSkill.nome) {
      validationErrors.nome = 'O nome é obrigatório';
    }
    if (!newSkill.descricao) {
      validationErrors.descricao = 'A descrição é obrigatória';
    }
    if (!newSkill.tecnologia) {
      validationErrors.tecnologia = 'A tecnologia é obrigatória';
    }
    if (!newSkill.nivel) {
      validationErrors.nivel = 'O nível é obrigatório';
    }
    return validationErrors;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowError(true);
      return;
    }

    try {
      // Registrar a nova skill
      const registeredSkill = await registerSkills({
        nome: newSkill.nome,
        descricao: newSkill.descricao,
        tecnologia: newSkill.tecnologia,
        nivel: newSkill.nivel,
      });

      // Upload da foto se houver um arquivo selecionado
      if (selectedFile) {
        await uploadPhoto(registeredSkill.id, selectedFile);
      }

      // Passa a skill registrada para o componente pai
      handleSubmit(registeredSkill);
      handleClose();
    } catch (error) {
      console.error('Erro ao registrar a skill ou fazer o upload da imagem:', error);
      setShowError(true);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Editar Skill' : 'Cadastrar Skill'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          {showError && <Alert variant="danger">Preencha todos os campos obrigatórios!</Alert>}

          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              as="select"
              name="nome"
              value={newSkill.nome}
              onChange={handleInputChange}
              isInvalid={!!errors.nome}
            >
              <option value="">Selecione o nome</option>
              {skillNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="select"
              name="descricao"
              value={newSkill.descricao}
              onChange={handleInputChange}
              isInvalid={!!errors.descricao}
            >
              <option value="">Selecione a descrição</option>
              {skillDescriptions.map((desc, index) => (
                <option key={index} value={desc}>
                  {desc}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.descricao}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Tecnologia</Form.Label>
            <Form.Control
              as="select"
              name="tecnologia"
              value={newSkill.tecnologia}
              onChange={handleInputChange}
              isInvalid={!!errors.tecnologia}
            >
              <option value="">Selecione a tecnologia</option>
              {skillTechnologies.map((tech, index) => (
                <option key={index} value={tech}>
                  {tech}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.tecnologia}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Nível</Form.Label>
            <Form.Control
              as="select"
              name="nivel"
              value={newSkill.nivel}
              onChange={handleInputChange}
              isInvalid={!!errors.nivel}
            >
              <option value="">Selecione o nível</option>
              {skillLevels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.nivel}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Upload de Imagem</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            {initialData ? 'Salvar' : 'Cadastrar'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
