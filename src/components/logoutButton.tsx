import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from '../context/authContext';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <Button
      variant="danger"
      style={{ borderColor: '#3fb7a0' }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
