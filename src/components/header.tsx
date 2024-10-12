import React from 'react';
import logo from '../assets/img/logo.png';
import LogoutButton from './logoutButton';

const Header: React.FC = () => {
  console.log("Header renderizado");

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#2a4e6d' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <img src={logo} style={{ width: '100px' }} alt="logo" />
          <LogoutButton />
        </div>
      </nav>
    </>
  );
};

export default Header;
