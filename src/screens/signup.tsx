import React, { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import './signup.css';
import logo from '../assets/img/logo.png';
import { useAuth } from '../context/authContext';

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [role, setRole] = useState('');

  const { register } = useAuth(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError('Por favor, insira um e-mail válido.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordError('As senhas não combinam.');
    } else {
      setPasswordError('');
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('As senhas não combinam.');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      return;
    }
    try {
      await register({
        nome: name,
        email: email,
        senha: password,
        cargo: role,
      });
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="card-container">
        <div className="card-content">
          <div className="left-section">
            <div className="logo-container">
              <img src={logo} alt="logo" className="logo" />
              <h4 className="title">Neki</h4>
            </div>
            <form onSubmit={handleSignup}>
              <p>Por favor preencha os dados para se cadastrar</p>
              <div className="form-outline">
                <input
                  type="text"
                  id="formName"
                  className="form-control"
                  placeholder="Nome"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
                <label className="form-label" htmlFor="formName">
                  Nome
                </label>
              </div>
              <div className="form-outline">
                <input
                  type="email"
                  id="formEmail"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <label className="form-label" htmlFor="formEmail">
                  Email
                </label>
                {emailError && <div className="text-danger">{emailError}</div>}
              </div>
              <div className="form-outline password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="formPassword"
                  className="form-control"
                  placeholder="Senha"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <label className="form-label" htmlFor="formPassword">
                  Senha
                </label>
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <BiHide /> : <BiShow />}
                </span>
              </div>
              <div className="form-outline password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="formConfirmPassword"
                  className="form-control"
                  placeholder="Confirme a Senha"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <label className="form-label" htmlFor="formConfirmPassword">
                  Confirme a Senha
                </label>
                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <BiHide /> : <BiShow />}
                </span>
                {passwordError && <div className="text-danger">{passwordError}</div>}
              </div>
              <div className="form-outline">
                <input
                  type="text"
                  id="formRole"
                  className="form-control"
                  placeholder="Cargo"
                  value={role}
                  onChange={handleRoleChange}
                  required
                />
                <label className="form-label" htmlFor="formRole">
                  Cargo
                </label>
              </div>
              <div className="signup-button-container">
                <button className="btn btn-primary btn-block" type="submit">
                  Cadastre-se
                </button>
              </div>
            </form>
          </div>
          <div className="right-section">
            <div className="info-container">
              <h4 className="info-title">Neki</h4>
              <p className="info-text">
                Bem-vindo à NEKI, onde cada desafio é uma oportunidade, e cada solução é uma otimização.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
