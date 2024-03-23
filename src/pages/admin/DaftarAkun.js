import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import Sidebar from '../../components/sidebarAdmin'; // Import Sidebar component

function DaftarAkun() {
    const Auth = useAuth();
    const user = Auth.getUser();

    const [users, setUsers] = useState([]);
    const history = useHistory(); // Initialize history
    const [isAdmin, setIsAdmin] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (user != null) {
            setIsAdmin(user.data.role[0] === 'Admin');
        }
        // Fetch data from backend
        fetch('https://silk-purwa.up.railway.app/api/user/all')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const handleTambahAkunClick = () => {
        history.push('/admin/tambah-akun'); // Navigate to '/admin/tambahAkun' when button clicked
    };

    const handleDeleteUser = (id) => {

        if (id === user.data.userId) {
            console.error('User cannot delete their own account.');
            setErrorMessage("Anda sedang login dengan akun ini. Tidak dapat menghapus akun!");
            // You can set an error message here if needed
            return;
        }

        // Send request to backend to delete user with specified id
        fetch(`http://silk-purwa.up.railway.app/api/user/${id}`, { method: 'DELETE' })
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

    if (!isAdmin) {
        history.push('/homepage-karyawan');
        return null;
    }
    if (user == null) {
        history.push('/login');
        return null;
    }


    return (
        <div className="dashboard d-flex">
            <div>
                <Sidebar />
            </div>
            <div className="dashboard-content">
            {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}
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
