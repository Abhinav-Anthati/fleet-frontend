import { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './components/Login'

function App() {
  const [credentials, setCredentials] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  function handleLoginSuccess(email, password) {
    setCredentials({ email, password });
  }

  useEffect(() => {
    if (!credentials) return;

    axios
      .get("http://localhost:8080/api/vehicles", {
        auth: { username: credentials.email, password: credentials.password },
      })
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error("Failed to fetch vehicles:", error));
  }, [credentials]);

  if (!credentials) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      <h1>Vehicles</h1>
      <ul>
        {vehicles.map((v) => (
          <li key={v.id}>
            {v.make} {v.model}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;