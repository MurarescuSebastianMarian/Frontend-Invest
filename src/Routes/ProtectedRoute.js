import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  // user,
  children
}) => {
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;