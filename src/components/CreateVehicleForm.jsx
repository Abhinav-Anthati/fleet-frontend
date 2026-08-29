import { useState } from 'react';
import api from '../api';

function CreateVehicleForm({ onCreated }) {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        api
            .post('/vehicles', {
                make,
                model,
                year: Number(year),
                licensePlate,
                status: 'AVAILABLE',
            })
            .then(() => {
                setMake('');
                setModel('');
                setYear('');
                setLicensePlate('');
                setError('');
                onCreated();
            })
            .catch(() => {
                setError('Failed to create vehicle, check all fields are filled correctly');
            });
    }

    return (
        <div>
            <h3>
                Create a Vehicle
            </h3>
            <form onSubmit={handleSubmit}>
                <input placeholder="Make" value={make} onChange={(e) => setMake(e.target.value)} />
                <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
                <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
                <input placeholder="License Plate" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
                <button type="submit">Add Vehicle</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default CreateVehicleForm;