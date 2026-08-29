import { useState, useEffect } from 'react'
import api from '../api'

function CreateReservationForm({ onCreated, showRequesterSelect = true }) {
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [requesters, setRequesters] = useState([]);
    const [requesterId, setRequesterId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/vehicles')
            .then((response) => setVehicles(response.data))
            .catch(error => console.error('Failed to fetch vehicles:', error));

        api.get('/users/drivers')
            .then((response) => setRequesters(response.data))
            .catch(error => console.error('Failed to fetch requesters:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        api
            .post('/reservations', {
                vehicle: { id: Number(vehicleId) },
                requester: { id: Number(requesterId) },
                startTime: startTime + ':00',
                endTime: endTime + ':00',
                description,
            })
            .then(() => {
                setVehicleId('');
                setRequesterId('');
                setStartTime('');
                setEndTime('');
                setDescription('');
                setError('');
                onCreated();
            })
            .catch(() => {
                setError('Failed to create reservation, check all fields are filled correctly');
            });
    }

    return (
        <div>
            <h3>
                Create a Reservation
            </h3>
            <form onSubmit={handleSubmit}>
                <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
                    <option value="">Select a vehicle</option>
                    {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                            {v.make} {v.model} ({v.licensePlate})
                        </option>
                    ))}
                </select>
                {showRequesterSelect && (
                    <select value={requesterId} onChange={(e) => setRequesterId(e.target.value)}>
                        <option value="">Select a requester</option>
                        {requesters.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.name} ({r.email})
                            </option>
                        ))}
                    </select>
                )}
                <input placeholder="Start Time" type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <input placeholder="End Time" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Add Reservation</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default CreateReservationForm;