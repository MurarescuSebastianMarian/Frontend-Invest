import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  // user,
  isQuizCompleted,
  children
}) => {
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  if (
    window.location.pathname !== '/quiz' &&
    !isQuizCompleted
  ) {
    return <Navigate to="/quiz" />;
  }

  return children;
};

export default ProtectedRoute;