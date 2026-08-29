import EnitityManagement from "./EntityManagement";
import CreateUserForm from "./CreateUserForm";
import api from '../api';

function handleRoleChange(id, newRole, refresh) {
    api
        .put(`/users/${id}/role`, newRole, {
            headers: { "Content-Type": "application/json" },
        })
        .then(refresh)
        .catch((err) => console.error("Failed to update role:", err));
}

function UserManagement() {
    return (
        <div>
            <h2>User Management</h2>
            <EnitityManagement
                endpoint="/users"
                renderItem={(u, refresh) => (
                    <div>
                        {u.name} ({u.email}) - {u.role}
                        <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value, refresh)}
                        >
                            <option value="DRIVER">DRIVER</option>
                            <option value="MANAGER">MANAGER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                )}
                CreateForm={CreateUserForm}
            />
        </div>
    );
}

export default UserManagement;