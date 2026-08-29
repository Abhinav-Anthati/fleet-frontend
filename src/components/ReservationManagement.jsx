import api from '../api'
import EntityManagement from "./EntityManagement";
import CreateReservationForm from "./CreateReservationForm";

function handleApprove(id, refresh) {
    api
        .put(`/reservations/${id}/status`, "APPROVED", {
            headers: { "Content-Type": "application/json" },
        })
        .then(refresh)
        .catch((err) => console.error("Failed to approve :", err));
}

function handleDeny(id, refresh) {
    api
        .put(`/reservations/${id}/status`, "DENIED", {
            headers: { "Content-Type": "application/json" },
        })
        .then(refresh)
        .catch((err) => console.error("Failed to deny :", err));
}

function ReservationManagement() {
    return (
        <div>
            <h2>Reservations</h2>
            <EntityManagement
                endpoint="/reservations"
                renderItem={(r, refresh) => (
                    <div>
                        {r.vehicle ? `${r.vehicle.make} ${r.vehicle.model}` : "Unknown vehicle"} -{" "}
                        {r.requester ? r.requester.name : "Unknown requester"} - {r.description} -{" "}
                        {r.startTime} to {r.endTime} - <strong>{r.status}</strong>
                        {r.status === "PENDING" && (
                            <>
                                <button onClick={() => handleApprove(r.id, refresh)}>Approve</button>
                                <button onClick={() => handleDeny(r.id, refresh)}>Deny</button>
                            </>
                        )}
                    </div>
                )}
                CreateForm={CreateReservationForm}
            />
        </div>
    );  
}

export default ReservationManagement;