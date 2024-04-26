import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginComponent() {
  const { login } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://project-secure-development-back.onrender.com/auth/login", data);
      const userData = response.data;
      login(userData);
      setIsLoggedIn(true);
      console.log("Usuario autenticado:", userData);
      toast.success("¡Inicio de sesión exitoso!");
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        const status = error.response.status;
        if (status === 401) {
          toast.error("Credenciales incorrectas");
        } else {
          toast.error("Ocurrió un error en el servidor");
        }
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        toast.error("Error de conexión, inténtalo de nuevo más tarde");
      } else {
        // Ocurrió un error antes de hacer la solicitud
        toast.error("Error al procesar la solicitud");
      }
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <section className="vh-100">
      <ToastContainer />
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

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                          {...register("email", { required: "Email es requerido" })}
                          placeholder="Email"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                          {...register("password", { required: "Contraseña es requerida" })}
                          placeholder="Contraseña"
                        />

                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                        
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
                        
                        <Link to="/register" className="btn btn-link">
                          Regístrate aquí
                        </Link>

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
