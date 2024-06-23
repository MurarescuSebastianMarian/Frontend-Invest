import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  children
}) => {


  const accessToken = localStorage.getItem('accessToken');
  const quizCompleted = localStorage.getItem('quizCompleted');

  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  if (
    window.location.pathname !== '/quiz' &&
    quizCompleted === 'false'
  ) {
    return <Navigate to="/quiz" />;
  }

  return children;
};

export default ProtectedRoute;