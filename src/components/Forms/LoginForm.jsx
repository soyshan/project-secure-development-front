import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom'; // Importa Navigate y Link desde react-router-dom

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
    } catch (error) {
      setError('Correo electrónico o contraseña incorrectos');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/showblogs" />;
  }

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
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      
                      <h5 className="fw-bold mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Iniciar sesión en tu cuenta
                      </h5>
                      {error && <div className="error">{error}</div>}
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Correo electrónico"
                          required
                        />
    
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña"
                          required
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">Iniciar sesión</button>
                      </div>
                      <a href="#!" className="small text-muted">¿Olvidaste tu contraseña?</a>
                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                        ¿No tienes una cuenta? <Link to="/register" className="btn btn-link">Regístrate aquí</Link>
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

export default LoginForm;



// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginForm = ({ switchToRegister }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/auth/login', { email, password });
//       // Manejar la lógica después del inicio de sesión exitoso
//     } catch (error) {
//       setError('Correo electrónico o contraseña incorrectos');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="email">Correo electrónico:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Contraseña:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Iniciar sesión</button>
//       {error && <div>{error}</div>}
//       <p>¿No tienes una cuenta? <button onClick={switchToRegister}>Regístrate aquí</button></p>
//     </form>
//   );
// };

// export default LoginForm;
