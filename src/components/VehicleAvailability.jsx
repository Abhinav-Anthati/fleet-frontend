import { useState, useEffect } from 'react'
import api from '../api'
import CreateReservationForm from './CreateReservationForm'

function VehicleAvailability({ vehicleId }) {
  const [windows, setWindows] = useState([]);

  useEffect(() => {
    if (!vehicleId) return;
    api
      .get(`/vehicles/${vehicleId}/availability`)
      .then((response) => setWindows(response.data))
      .catch(error => console.error('Failed to fetch availability:', error));
  }, [vehicleId]);

  if (!vehicleId) {
    return <p>Select a vehicle to see availability</p>;
  }

  return (
    <div>
      <h3>Busy Times</h3>
        <ul>
            {windows.map((w, i) => (
                <li key={i}>
                    {w.startTime} to {w.endTime}
                </li>
            ))}
        </ul>
    </div>
  );
}

export default VehicleAvailability;