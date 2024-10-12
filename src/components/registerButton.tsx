import React from 'react';
import { Button } from 'react-bootstrap';


interface RegisterButtonProps {
  handleShowModal: () => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ handleShowModal }) => {
  return (
    <Button variant="primary" onClick={handleShowModal}>
      Cadastrar Skill
    </Button>
  );
};

export default RegisterButton;
