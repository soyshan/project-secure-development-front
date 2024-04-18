// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Lógica para iniciar sesión (puedes implementarla según tu aplicación)
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Lógica para cerrar sesión (puedes implementarla según tu aplicación)
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
