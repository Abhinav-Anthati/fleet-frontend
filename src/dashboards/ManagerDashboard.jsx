import VehicleManagement from '../components/VehicleManagement';
import ReservationManagement from "../components/ReservationManagement";
import MaintenanceWindowManagement from "../components/MaintenanceWindowManagement";

function ManagerDashboard( { currentUser, onLogout } ) {
    return (
        <div>
            <h1>Manager Dashboard</h1>
            <p>Logged in as {currentUser.name}</p>
            <button onClick={onLogout}>Log Out</button>
            <VehicleManagement />
            <ReservationManagement />
            <MaintenanceWindowManagement />
        </div>
    );
}

export default ManagerDashboard;