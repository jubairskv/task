import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '../services/authService';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ roles }) => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode(currentUser.token);

  // Check if user's role is authorized
  if (roles && !roles.includes(decodedToken.role)) {
    // Role not authorized
    return <Navigate to="/" />;
  }

  // Authorized
  return <Outlet />;
};

export default PrivateRoute;
