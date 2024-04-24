import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa useAuth desde AuthContext

const ProfilePage = () => {
  const { user, logout } = useAuth(); // Usa useAuth para acceder al contexto de autenticación y la función logout

  // Verificar si el usuario está autenticado
  if (!user) {
    // Si el usuario no está autenticado, redirigirlo al inicio de sesión
    return <Navigate to="/login" />;
  }

  // Función para manejar el logout
  const handleLogout = () => {
    logout(); // Llama a la función de logout del contexto de autenticación
    return <Navigate to="/login" />; // Redirige al usuario al inicio de sesión
  };

  // Renderiza la página de perfil
  return (
    <div class="max-w-screen-md mx-auto mt-16">
       <div class="card p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center justify-center">
          {/* <img className="w-24 h-24 rounded-full mb-4" src={user.profileImage} alt="Avatar" /> */}
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
        <div className="mt-6">
          <div className="flex justify-between">
            <button className="text-sm text-gray-700 hover:text-gray-900 focus:outline-none" onClick={handleLogout}>
              Logout
            </button>
            <a href="/blogs" className="text-sm text-blue-500 hover:underline">
              Mis blogs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;