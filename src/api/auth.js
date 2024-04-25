import axios from "axios";

const baseURL = "https://project-secure-development-back.onrender.com"; 

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Tiempo de espera para las solicitudes
});


// Función para registrar un usuario
export const registerRequest = async (user) => {
  try {
    const response = await instance.post(`/auth/register`, user); // Usa la instancia configurada
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    throw error; // Lanza el error para ser manejado por el componente
  }
};


export default instance; // para exportar instancia de Axios por si se va a usar en otro sitio.
