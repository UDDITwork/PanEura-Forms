import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook for using the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('paneuraAuthUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // Hard-coded credentials for admin
    // In a real app, this would be a server request
    if (email === 'udditalerts247@gmail.com' && password === 'Uddit123@123') {
      const user = { email, role: 'admin' };
      localStorage.setItem('paneuraAuthUser', JSON.stringify(user));
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('paneuraAuthUser');
    setCurrentUser(null);
  };

  // Value object to be provided to consumers
  const value = {
    currentUser,
    login,
    logout,
    isAdmin: currentUser?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};