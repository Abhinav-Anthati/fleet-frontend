import { useState, useEffect } from 'react';
import api from '../api';

function CreateUserForm({ onCreated }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        api
            .post('/users', {
                name,
                email,
                password,
                role,
            })
            .then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setRole('');
                setError('');
                onCreated();
            })
            .catch(() => {
                setError('Failed to create user, check all fields are filled correctly');
            });
    }

    return (
        <div>
            <h3>
                Create a User
            </h3>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select a role</option>
                    <option value="DRIVER">Driver</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button type="submit">Add User</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default CreateUserForm;