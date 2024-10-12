import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center text-white" style={{ backgroundColor: '#2a4e6d', color: 'white', padding: '20px 0' }}>
      <p>© {new Date().getFullYear()} Desenvolvido por Matheus Mello</p>
    </footer>
  );
}

export default Footer;
