import { useState, useEffect } from 'react'
import api from '../api'
import CreateMaintenanceWindowForm from "./CreateMaintenanceWindowForm";

function MaintenanceWindowList() {
    const [maintenanceWindows, setMaintenanceWindows] = useState([]);
    
    useEffect(() => {
        fetchMaintenanceWindows();
    }, []);

    function fetchMaintenanceWindows() {
        api
            .get('/maintenance-windows')
            .then((response) => setMaintenanceWindows(response.data))
            .catch((error) => console.error('Failed to fetch maintenance windows:', error));
    }

    return (
        <div>
            <h2>Maintenance Windows</h2>
            <ul>
                {maintenanceWindows.map((mw) => (
                    <li key={mw.id}>
                        {mw.vehicle ? `${mw.vehicle.make} ${mw.vehicle.model}` : "Unknown vehicle"} -{" "}
                        {mw.startTime} to {mw.endTime} - {mw.description}
                    </li>
                ))}
            </ul>
            <h3>Add New Maintenance Window</h3>
            <CreateMaintenanceWindowForm onCreated={fetchMaintenanceWindows} />
        </div>
    );
}

export default MaintenanceWindowList;