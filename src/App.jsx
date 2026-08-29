import { useState, useEffect } from 'react'
import api, { setAuth } from './api'
import Login from './Login'
import AdminDashboard from './dashboards/AdminDashboard'
import ManagerDashboard from './dashboards/ManagerDashboard'
import DriverDashboard from './dashboards/DriverDashboard'

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  function handleLoginSuccess(email, password) {
    setAuth(email, password);
    api.get('/users/me')
      .then(response => setCurrentUser(response.data))
      .catch(error => console.error('Failed to fetch current user:', error));
  }

  function handleLogout() {
    clearAuth();
    setCurrentUser(null);
  }

  if (!currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentUser.role === 'ADMIN') {
    return <AdminDashboard currentUser={currentUser} onLogout={handleLogout} />;
  }
  if (currentUser.role === "MANAGER") {
    return <ManagerDashboard currentUser={currentUser} onLogout={handleLogout} />;
  }
  if (currentUser.role === "DRIVER") {
    return <DriverDashboard currentUser={currentUser} onLogout={handleLogout} />;
  }
  return <p>Unknown role, contact an administrator.</p>;
}

export default App;