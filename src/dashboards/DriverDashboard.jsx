import { useState, useEffect } from "react";
import api from "../api";
import VehicleAvailability from "../components/VehicleAvailability";
import CreateReservationForm from "../components/CreateReservationForm";

function DriverDashboard({ currentUser, onLogout }) {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState("");
    const [myReservations, setMyReservations] = useState([]);

    useEffect(() => {
        api
            .get("/vehicles")
            .then((response) => setVehicles(response.data))
            .catch((error) => console.error("Failed to fetch vehicles:", error));

        fetchMyReservations();
    }, []);

    function fetchMyReservations() {
        api
            .get("/reservations/mine")
            .then((response) => setMyReservations(response.data))
            .catch((error) => console.error("Failed to fetch your reservations:", error));
    }

    return (
        <div className="dashboard" style={{ borderTop: "4px solid #d97706" }}>
            <h1>Driver Dashboard</h1>
            <p>Logged in as {currentUser.name}</p>
            <button onClick={onLogout}>Logout</button>

            <h2>Check Vehicle Availability</h2>
            <select value={selectedVehicleId} onChange={(e) => setSelectedVehicleId(e.target.value)}>
                <option value="">Select a vehicle</option>
                {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                        {v.make} {v.model}
                    </option>
                ))}
            </select>
            <VehicleAvailability vehicleId={selectedVehicleId} />

            <h2>Book a Vehicle</h2>
            <CreateReservationForm onCreated={fetchMyReservations} showRequesterSelect={false} />

            <h2>My Reservations</h2>
            <ul>
                {myReservations.map((r) => (
                    <li key={r.id}>
                        {r.vehicle?.make} {r.vehicle?.model} - {r.startTime} to {r.endTime} - {r.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DriverDashboard;