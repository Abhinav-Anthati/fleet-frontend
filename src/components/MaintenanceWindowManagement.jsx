import EntityManagement from "./EntityManagement";
import CreateMaintenanceWindowForm from "./CreateMaintenanceWindowForm";

function MaintenanceWindowManagement() {
    return (
        <div>
            <h2>Maintenance Windows</h2>
            <EntityManagement
                endpoint="/maintenance-windows"
                renderItem={(mw) =>
                    `${mw.vehicle ? `${mw.vehicle.make} ${mw.vehicle.model}` : "Unknown vehicle"} - ${mw.startTime} to ${mw.endTime} - ${mw.description}`
                }
                CreateForm={CreateMaintenanceWindowForm}
            />
        </div>
    );
}

export default MaintenanceWindowManagement;