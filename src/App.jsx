import { useState, useEffect } from 'react'
import api, { setAuth } from './api'
import Login from './Login'
import AdminDashboard from './dashboards/AdminDashboard'

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

  return <AdminDashboard currentUser={currentUser} onLogout={handleLogout} />;
}

export default App;