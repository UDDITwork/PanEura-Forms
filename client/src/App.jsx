import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import ClientDetails from './components/ClientDetails';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

// Navigation component with conditional links based on auth status
function Navigation() {
  const { currentUser, logout, isAdmin } = useAuth();

  return (
    <nav className="app-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        Register Client
      </NavLink>
      
      {isAdmin ? (
        <>
          <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
            Admin Panel
          </NavLink>
          <button 
            onClick={logout} 
            style={{ 
              marginLeft: 'auto',
              background: 'none', 
              border: 'none', 
              color: '#ef4444',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
          Admin Login
        </NavLink>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <header className="app-header">
            <div className="app-logo">
              <img src="/logo192.png" alt="PanEura Automations Logo" />
              <span>PanEura Automations</span>
            </div>
          </header>
          
          <Navigation />
          
          <main>
            <Routes>
              <Route path="/" element={<ClientForm />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected admin routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/admin" element={<ClientList />} />
                <Route path="/admin/:id" element={<ClientDetails />} />
              </Route>
            </Routes>
          </main>
          
          <footer style={{ 
            textAlign: 'center', 
            padding: '1.5rem', 
            marginTop: '2rem',
            backgroundColor: '#0f172a',
            color: 'white' 
          }}>
            <p>© {new Date().getFullYear()} PanEura Automations. All rights reserved.</p>
            <p>Eurasia's fastest growing Internet Solutions Provider and Automation Organization.</p>
            <p><a href="https://paneura.site" target="_blank" rel="noopener noreferrer" style={{ color: '#06b6d4' }}>Visit our website</a></p>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}