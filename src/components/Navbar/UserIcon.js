import React from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../../assets/user-icon-vector.svg';

import userLoggedInIcon from '../../assets/user-icon.png';

const UserIcon = ({ isAuthenticated }) => {
  return (
    <Link to={isAuthenticated ? "/profile" : "/login"} className="user-icon">
      <img src={isAuthenticated ? userLoggedInIcon : userIcon} alt='Cuenta' /> 
    </Link>
  );
};

export default UserIcon;