import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isLoggedIn, ...rest }) => {
  return isLoggedIn ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
