import { useState, useEffect } from 'react'
import api from '../api'

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    function fetchUsers() {
        api.get('/users')
            .then((response) => setUsers(response.data))
            .catch((err) => {
                console.error('Failed to fetch users:', err);
                setError("Could not load users");
            });
    }

    function handleRoleChange(id, newRole) {
        api
            .put(`/users/${id}/role`, newRole, {
                headers: { "Content-Type": "application/json" },
            })
            .then(() => fetchUsers())
            .catch((err) => console.error("Failed to update role:", err));
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <h2>User Management</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email}) - Role: {user.role}
                        <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        >
                            <option value="DRIVER">Driver</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default UserManagement;