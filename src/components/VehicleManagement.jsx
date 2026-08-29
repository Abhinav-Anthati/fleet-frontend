import EntityManagement from "./EntityManagement";
import CreateVehicleForm from "./CreateVehicleForm";

function VehicleManagement() {
    return (
        <div>
            <h2>Vehicles</h2>
            <EntityManagement
                endpoint="/vehicles"
                renderItem={(v) => `${v.make} ${v.model} (${v.licensePlate}) - ${v.status}`}
                CreateForm={CreateVehicleForm}
            />
        </div>
    );
}

export default VehicleManagement;