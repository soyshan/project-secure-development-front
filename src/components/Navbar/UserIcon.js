import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import userIcon from '../../assets/user-icon.png';
import userLoggedInIcon from '../../assets/user-icon.png';
import { useAuth } from '../../context/AuthContext'; // Importamos el hook useAuth
import './UserMenu.css';

const UserIcon = () => {
  const { user, logout } = useAuth(); // Obtenemos el usuario y la función logout del contexto de autenticación
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú está abierto
  const navigate = useNavigate();


  const handleLogout = () => {
    logout(); // Llamamos a la función logout del contexto de autenticación
  };

  const handleIconClick = () => {
    // Si el usuario no está autenticado, redirigir al formulario de inicio de sesión
    if (!user) {
      navigate('/login'); 
    } else {

      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <div className="user-icon-wrapper">
      <div className="user-icon" onClick={handleIconClick}>
        {/* Comprobamos si hay un usuario autenticado para mostrar el icono correspondiente */}
        <img src={user ? userLoggedInIcon : userIcon} alt="Cuenta" />
      </div>
      {/* Mostramos el menú desplegable solo si está abierto y el usuario está autenticado */}
      {user && isMenuOpen && (
        <ul className="user-menu">
          {/* Mostramos las opciones de perfil y cerrar sesión si el usuario está autenticado */}
          <li>
            <Link to="/profile">Mi Perfil</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserIcon;
