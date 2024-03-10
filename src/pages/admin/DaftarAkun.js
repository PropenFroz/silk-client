import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import Sidebar from '../../components/sidebarAdmin'; // Import Sidebar component

function DaftarAkun() {
    const [users, setUsers] = useState([]);
    const history = useHistory(); // Initialize history

    useEffect(() => {
        // Fetch data from backend
        fetch('http://localhost:8080/api/user/all')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const handleTambahAkunClick = () => {
        history.push('/admin/tambahAkun'); // Navigate to '/admin/tambahAkun' when button clicked
    };

    const handleDeleteUser = (id) => {
        // Send request to backend to delete user with specified id
        fetch(`http://localhost:8080/api/user/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    // If deletion is successful, update the state to reflect changes
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                } else {
                    // Handle error if deletion is not successful
                    console.error('Failed to delete user');
                }
            })
            .catch(error => {
                console.error('Error occurred while deleting user:', error);
            });
    };


    return (
        <div className="dashboard d-flex">
            <div>
                <Sidebar />
            </div>
            <div className="dashboard-content">
                <h2>User List</h2>
                <button onClick={handleTambahAkunClick}>Tambah Akun</button>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user.id)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DaftarAkun;
