import { useState, useEffect } from 'react'
import api from '../api'

function CreateMaintenanceWindowForm({ onCreated }) {
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/vehicles')
            .then((response) => setVehicles(response.data))
            .catch(error => console.error('Failed to fetch vehicles:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        api
            .post('/maintenance-windows', {
                vehicle: { id: Number(vehicleId) },
                startTime: startTime + ':00',
                endTime: endTime + ':00',
                description,
            })
            .then(() => {
                setVehicleId('');
                setStartTime('');
                setEndTime('');
                setDescription('');
                setError('');
                onCreated();
            })
            .catch(() => {
                setError('Failed to create maintenance window, check all fields are filled correctly');
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
                <option value="">Select a vehicle</option>
                {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                        {v.make} {v.model} ({v.licensePlate})
                    </option>
                ))}
            </select>
            <input placeholder="Start Time" type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <input placeholder="End Time" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Add Maintenance Window</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}

export default CreateMaintenanceWindowForm;