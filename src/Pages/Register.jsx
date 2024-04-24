import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { registerRequest } from '../api/auth'; // Asegúrate de que la ruta sea correcta


const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false);

  const onChange = (value) => {
    console.log("Captcha value:", value);
    setRecaptchaCompleted(true);
  };

  const onSubmit = async (data) => {
    if (!recaptchaCompleted) {
      setError('Debes completar el ReCAPTCHA antes de registrarte.');
      return;
    }
  
    try {
      const response = await registerRequest(data); // Utiliza registerRequest en lugar de axios.post
      if (response.status === 200)
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
                    <form onSubmit={handleSubmit(onSubmit)}>

                      <h5 className="fw-bold mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Regístrate en tu cuenta
                      </h5>

                      {errors.recaptcha && <div className="error">Debes completar el ReCAPTCHA antes de registrarte.</div>}
                      {error && <div className="error">{error}</div>}

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="registerFirstName"
                          className={`form-control form-control-lg ${errors.firstName ? 'is-invalid' : ''}`}
                          {...register("firstName", { required: 'Por favor, introduce tu nombre.' })}
                          placeholder="Nombre"
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="registerLastName"
                          className={`form-control form-control-lg ${errors.lastName ? 'is-invalid' : ''}`}
                          {...register("lastName", { required: 'Por favor, introduce tu apellido.' })}
                          placeholder="Apellido"
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="registerUsername"
                          className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
                          {...register("username", { required: 'Por favor, introduce tu usuario.' })}
                          placeholder="Usuario"
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="registerEmail"
                          className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                          {...register("email", { required: 'Por favor, introduce tu email.' })}
                          placeholder="Email"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="registerPassword"
                          className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                          {...register("password", { required: 'Por favor, introduce tu contraseña.' })}
                          placeholder="Contraseña"
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                      </div>

                      <div className="form-check mb-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="termsCheckbox"
                          {...register("terms", { required: 'Debes aceptar los términos y condiciones para registrarte.' })}
                        />
                        <label className="form-check-label" htmlFor="termsCheckbox">
                          Acepto los <Link to="#terminos">términos y condiciones</Link>
                        </label>
                        {errors.terms && <div className="invalid-feedback">{errors.terms.message}</div>}
                      </div>

                      <ReCAPTCHA
                        sitekey="6LepbL8pAAAAAGU9IE_bp24zv4DZ2L0Jg07ew6UO"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}
                        onChange={onChange}
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
