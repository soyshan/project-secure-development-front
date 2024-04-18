import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import ReCAPTCHA from "react-google-recaptcha";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false);

  const onChange = (value) => {
    console.log("Captcha value:", value);
    setRecaptchaCompleted(true);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) { // Verificar si los términos y condiciones están aceptados
      setError('Debes aceptar los términos y condiciones para registrarte.');
      return;
    }
    if (!recaptchaCompleted) { // Verificar si el ReCAPTCHA ha sido completado
      setError('Debes completar el ReCAPTCHA antes de registrarte.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/register', { firstName, lastName, username,  email, password });
      window.location.href = '/showblogs';
    } catch (error) {
      setError('Error al registrar el usuario');
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://images.unsplash.com/photo-1598884805372-0059ec53cbdd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="registration form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>

                      <h5 className="fw-bold mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Regístrate en tu cuenta
                      </h5>

                      {error && <div className="error">{error}</div>}

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="registerFirstName"
                          className="form-control form-control-lg"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Nombre"
                          required

                        />
                    
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="registerLastName"
                          className="form-control form-control-lg"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Apellido"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="registerUsername"
                          className="form-control form-control-lg"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Usuario" // Campo de usuario
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="registerEmail"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="registerPassword"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña"
                          required
                        />
                      </div>

                      <div className="form-check mb-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={termsAccepted}
                          onChange={() => setTermsAccepted(!termsAccepted)}
                          id="termsCheckbox"
                          required
                        />
                        <label className="form-check-label" htmlFor="termsCheckbox">
                          Acepto los <Link to="#terminos">términos y condiciones</Link>
                        </label>
                      </div>
                      <ReCAPTCHA
    sitekey="6LepbL8pAAAAAGU9IE_bp24zv4DZ2L0Jg07ew6UO" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }} // Reemplaza con tu clave del sitio cliente
    onChange={onChange} // Define la función onChange para manejar los cambios en el ReCAPTCHA
  />




                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">Registrarse</button>
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                        ¿Ya tienes una cuenta? <Link to="/login" className="btn btn-link">Inicia sesión aquí</Link>
                      </p>
                      
                    </form>
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

export default RegisterForm;
