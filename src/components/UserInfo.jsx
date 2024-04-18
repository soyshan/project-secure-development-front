import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <div>
      <h2>Información del usuario</h2>
      <p>Nombre: {user.firstName}</p>
      <p>Apellido: {user.lastName}</p>
      <p>Correo electrónico: {user.email}</p>
    </div>
  );
};

export default UserInfo;
