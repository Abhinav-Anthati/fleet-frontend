import VehicleManagement from '../components/VehicleManagement';
import ReservationManagement from "../components/ReservationManagement";
import UserManagement from "../components/UserManagement";
import MaintenanceWindowManagement from "../components/MaintenanceWindowManagement";

function AdminDashboard({ currentUser, onLogout }) {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Logged in as {currentUser.name}</p>
            <button onClick={onLogout}>Logout</button>
            <VehicleManagement />
            <ReservationManagement />
            <UserManagement />
            <MaintenanceWindowManagement />
        </div>
    );
}

export default AdminDashboard;