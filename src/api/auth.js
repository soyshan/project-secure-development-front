import axios from "axios";

const baseURL = "http://localhost:8000"; 

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Tiempo de espera para las solicitudes
});


// Función para registrar un usuario
export const registerRequest = async (user) => {
  try {
    const response = await instance.post(`/auth/register`, user); // Usa la instancia configurada
    if (response.status === 200) {
      console.log("Registro exitoso:", response.data); // Registro para depuración
      return response.data; // Devuelve los datos de la respuesta
    } else {
      throw new Error(`Error al registrar usuario: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error en la solicitud de registro:", error); // Registro para depuración
    throw new Error("Error al procesar la solicitud de registro. Por favor, inténtalo de nuevo."); // Lanza el error para ser manejado por el componente
  }
};

export default instance; // para exportar instancia de Axios por si se va a usar en otro sitio.
