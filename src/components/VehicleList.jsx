import { useState, useEffect } from 'react'
import api from '../api'
import CreateVehicleForm from "./CreateVehicleForm";

function VehicleList() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchVehicles();
    }, []);

    function fetchVehicles() {
        api
            .get('/vehicles')
            .then(response => setVehicles(response.data))
            .catch(error => console.error('Failed to fetch vehicles:', error));
    }

    return (
        <div>
            <h2>Vehicles</h2>
            <ul>
                {vehicles.map(v => (
                    <li key={v.id}>
                        {v ? `${v.make} ${v.model} - ${v.status}` : "Unknown vehicle"}
                    </li>
                ))}
            </ul>
            <h3>Add New Vehicle</h3>
            <CreateVehicleForm onCreated={fetchVehicles} />
        </div>
    );
}

export default VehicleList;
