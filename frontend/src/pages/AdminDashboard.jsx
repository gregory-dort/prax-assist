import { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [role, setRole] = useState('');
    const [notification, setNotification] = useState('');
    const [targetUser, setTargetUser] = useState('');

    // fetch all users
    useEffect(() => {
        fetch("/api/admin/users")
        .then(res => res.json())
        .then(data => {setUsers(data);})
        .catch(err => console.error(err));
    }, []);

    const handleRoleAssign = async () => {
        const res = await fetch('/api/admin/assign-role', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: selectedUser, role })
        });
        const data = await res.json();
        alert(data.message);
    };

    const handleSendNotification = async () => {
        const res = await fetch('/api/admin/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: notification, targetUser })
        });
        const data = await res.json();
        alert(data.message);
    };

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

        {/* Role Assignment Section */}
        <div className="card bg-base-100 shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Assign Role</h2>
            <select 
                className="select select-bordered w-full mb-4" 
                onChange={e => setSelectedUser(e.target.value)} 
                value={selectedUser}
            >
                <option disabled value="">Select a user</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.username}
                    </option>
                ))}
            </select>

            <select 
                className="select select-bordered w-full mb-4"
                onChange={e => setRole(e.target.value)} 
                value={role}
            >
                <option disabled value="">Select a role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <button className="btn btn-primary" onClick={handleRoleAssign}>
                Assign Role
            </button>
        </div>

        {/* Notification Section */}
        <div className="card bg-base-100 shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Send Notification</h2>

            <textarea 
                className="textarea textarea-bordered w-full mb-4" 
                placeholder="Enter your message"
                value={notification}
                onChange={e => setNotification(e.target.value)}
            />

            <select 
                className="select select-bordered w-full mb-4" 
                onChange={e => setTargetUser(e.target.value)} 
                value={targetUser}
            >
                <option value="all">All Users</option>
                {users.map(user => (
                    <option key={user._id} value={user.username}>
                        {user.username}
                    </option>
                ))}
            </select>

            <button className="btn btn-secondary" onClick={handleSendNotification}>
                Send Notification
            </button>
        </div>
      </div>
    );
};

export default AdminDashboard;