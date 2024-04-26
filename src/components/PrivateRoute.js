import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" />} // Redirige a la página de inicio de sesión si el usuario no está autenticado
    />
  );
};

export default PrivateRoute;
