import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import './login.css';
import logo from '../assets/img/logo.png';
import { useAuth } from '../context/authContext';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [savePassword, setSavePassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');

  const { login } = useAuth(); // Usando o hook para pegar a função de login
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setSavePassword(true);
    }
  }, []);

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSavePasswordChange = () => {
    const newSavePassword = !savePassword;
    setSavePassword(newSavePassword);
    if (newSavePassword) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      return;
    }
    try {
      await login({ email, senha: password }); // Usando a função login do contexto
      navigate('/home');
    } catch (error) {
      setLoginError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      console.error('Login error:', error);
    }
  };

  return (
    <section className="h-100 gradient-form">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src={logo} style={{ width: '150px' }} alt="logo" />
                      <h4 className="mt-1 mb-5 pb-1">Neki</h4>
                    </div>
                    <form onSubmit={handleLogin}>
                      <p>Por favor entre com sua conta</p>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={handleEmailChange}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Nome de usuário
                        </label>
                        {emailError && <div className="text-danger">{emailError}</div>}
                      </div>
                      <div className="form-outline mb-4 password-container">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="form2Example22"
                          className="form-control"
                          placeholder="Senha"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Senha
                        </label>
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                          {showPassword ? <BiHide /> : <BiShow />}
                        </span>
                      </div>
                      <div className="form-check mb-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={savePassword}
                          onChange={handleSavePasswordChange}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Salvar senha
                        </label>
                      </div>
                      {loginError && <div className="text-danger mb-3">{loginError}</div>}
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">
                          Entre
                        </button>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Não tem uma conta?</p>
                        <button
                          type="button"
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          onClick={handleSignupClick}
                        >
                          Cadastre-se
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Neki</h4>
                    <p className="small mb-0">
                      Bem-vindo à NEKI, onde cada desafio é uma oportunidade, e cada solução é uma otimização.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
