// authContext.js
import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const AuthContext = createContext();

// Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);

// Componente proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario autenticado


  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
    // Aquí podrías realizar cualquier acción adicional, como guardar la información del usuario en el almacenamiento local (localStorage o sessionStorage)
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    // Aquí podrías realizar cualquier acción adicional, como limpiar la información del usuario en el almacenamiento local
  };

  // Valor del contexto que será compartido
  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
