import { useState, useEffect } from 'react'
import api from '../api'

function ReservationList() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchReservations();
    }, []);

    function fetchReservations() {
        api
            .get("/reservations")
            .then((response) => setReservations(response.data))
            .catch((err) => {
                console.error("Failed to fetch reservations:", err);
                setError("Could not load reservations");
            });
    }

    function handleApprove(id) {
        api
            .put(`/reservations/${id}/status`, "APPROVED", {
                headers: { "Content-Type": "application/json" },
            })
            .then(() => fetchReservations())
            .catch((err) => console.error("Failed to approve :", err));
    }

    function handleDeny(id) {
        api
            .put(`/reservations/${id}/status`, "DENIED", {
                headers: { "Content-Type": "application/json" },
            })
            .then(() => fetchReservations())
            .catch((err) => console.error("Failed to deny :", err));
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <h2>Reservations</h2>
            <ul>
                {reservations.map((r) => (
                    <li key={r.id}>
                        {r.vehicle ? `${r.vehicle.make} ${r.vehicle.model}` : "Unknown vehicle"} -{" "}
                        {r.requester ? r.requester.name : "Unknown requester"} -{" "}
                        {r.startTime} to {r.endTime} - <strong>{r.status}</strong>
                        {r.status === "PENDING" && (
                            <>
                                <button onClick={() => handleApprove(r.id)}>Approve</button>
                                <button onClick={() => handleDeny(r.id)}>Deny</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );  
}

export default ReservationList;