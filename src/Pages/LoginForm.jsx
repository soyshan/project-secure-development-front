// // LoginComponent.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// function LoginComponent() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8000/auth/login", {
//         email,
//         password,
//       });
//       const userData = response.data;
//       login(userData); // Utilizamos la función login del contexto de autenticación para almacenar la información del usuario
//       setIsLoggedIn(true);
//       console.log("Usuario autenticado:", userData);
//     } catch (error) {
//       setError("Credenciales incorrectas");
//     }
//   };

//   if (isLoggedIn) {
//     return <Navigate to="/profile" />;
//   }

//   return (
//     <section className="vh-100" >
//       <div className="container py-5 h-100">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col col-xl-10">
//             <div className="card" style={{ borderRadius: "1rem" }}>
//               <div className="row g-0">
//                 <div className="col-md-6 col-lg-5 d-none d-md-block">
//                   <img
//                     src="https://images.unsplash.com/photo-1598884805372-0059ec53cbdd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                     alt="login form"
//                     className="img-fluid"
//                     style={{ borderRadius: "1rem 0 0 1rem" }}
//                   />
//                 </div>
//                 <div className="col-md-6 col-lg-7 d-flex align-items-center">
//                   <div className="card-body p-4 p-lg-5 text-black">
//                     <form onSubmit={handleSubmit}>
//                       <h5
//                         className="fw-normal mb-3 pb-3"
//                         style={{ letterSpacing: "1px" }}
//                       >
//                         Iniciar sesión en tu cuenta
//                       </h5>

//                       {error && <div className="error">{error}</div>}

//                       <div className="form-outline mb-4">
//                         <input
//                           type="email"
//                           className="form-control form-control-lg"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           placeholder="Email"
//                           required
//                         />
//                       </div>

//                       <div className="form-outline mb-4">
//                         <input
//                           type="password"
//                           className="form-control form-control-lg"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           placeholder="Contraseña"
//                           required
//                         />
//                       </div>
//                       <div className="pt-1 mb-4">
//                         <button
//                           className="btn btn-dark btn-lg btn-block"
//                           type="submit"
//                         >
//                           Iniciar sesión
//                         </button>
//                       </div>
//                       <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
//                         ¿No tienes una cuenta?{" "}
//                         <a href="/register" className="btn btn-link">
//                           Regístrate aquí
//                         </a>
//                       </p>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default LoginComponent;


// LoginComponent.js
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginComponent() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", data);
      const userData = response.data;
      login(userData);
      setIsLoggedIn(true);
      console.log("Usuario autenticado:", userData);
    } catch (error) {
      setError("Credenciales incorrectas");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://images.unsplash.com/photo-1598884805372-0059ec53cbdd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Iniciar sesión en tu cuenta
                      </h5>

                      {error && <div className="error">{error}</div>}

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          {...register("email", { required: "Email es requerido" })}
                          placeholder="Email"
                        />
                        {errors.email && <div className="error">{errors.email.message}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          {...register("password", { required: "Contraseña es requerida" })}
                          placeholder="Contraseña"
                        />
                        {errors.password && <div className="error">{errors.password.message}</div>}
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Iniciar sesión
                        </button>
                      </div>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        ¿No tienes una cuenta?{" "}
                        <a href="/register" className="btn btn-link">
                          Regístrate aquí
                        </a>
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
}

export default LoginComponent;
