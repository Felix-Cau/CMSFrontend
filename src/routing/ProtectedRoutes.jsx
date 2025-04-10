import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../partials/components/LoadingSpinner';


export const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  return token ? children : <Navigate to="/signin" replace />
};

export const AdminRoute = ({ children }) => {
  const { loading, token, isAdmin } = useAuth()
  
  if (loading) return <LoadingSpinner />
  return token && isAdmin ? children : <Navigate to="/projects" replace />
};