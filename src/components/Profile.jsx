import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    return <Navigate to="/login" />;
  };

  return (
    <div className="container mt-5 justify-content-center">
       <div className="row justify-content-center">
       <div className="col-md-8 ">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              {/* Replace 'user.profileImage' with the actual source of user's profile image */}
              <img src="https://images.unsplash.com/photo-1708261432863-41fdab7b5de9?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="img-fluid rounded-circle" style={{ maxWidth: "200px", maxHeight: "200px" }}  />
            </div>
            <div className="col-md-12">
              <h2>{user.name}</h2>
              <p className="text-muted">{user.email}</p>
              <div className="d-flex justify-content-between">
                <Link to="/showblogs" className="btn btn-primary">Mis blogs</Link>
                <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
