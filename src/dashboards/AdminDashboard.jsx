import VehicleList from '../components/VehicleList';
import ReservationList from "../components/ReservationList";
import UserManagement from "../components/UserManagement";
import MaintenanceWindowList from "../components/MaintenanceWindowList";

function AdminDashboard({ currentUser, onLogout }) {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Logged in as {currentUser.name}</p>
            <button onClick={onLogout}>Logout</button>
            <VehicleList />
            <ReservationList />
            <UserManagement />
            <MaintenanceWindowList />
        </div>
    );
}

export default AdminDashboard;