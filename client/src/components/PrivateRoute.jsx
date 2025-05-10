import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
  const { currentUser, isAdmin } = useAuth();

  // Check if user is logged in and is an admin
  if (!currentUser || !isAdmin) {
    // If not logged in or not admin, redirect to login page
    return <Navigate to="/login" />;
  }

  // If user is logged in as admin, render the protected route
  return <Outlet />;
}