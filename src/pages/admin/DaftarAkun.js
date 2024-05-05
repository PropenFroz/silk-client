import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/auth/context/AuthContext';
import { config } from '../../Constants'
import { useHistory } from 'react-router-dom'; 
import Sidebar from '../../components/sidebarAdmin'; 

function DaftarAkun() {
    const Auth = useAuth();
    const user = Auth.getUser();

    const [users, setUsers] = useState([]);
    const history = useHistory(); 
    const [isAdmin, setIsAdmin] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const baseUrl = config.url.API_BASE_URL + '/api/';

    console.log("ini base url " + baseUrl);

    useEffect(() => {
        if (user != null) {
            setIsAdmin(user.data.role[0] === 'Admin');
        }
        fetch(`${baseUrl}user/all`)
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const handleTambahAkunClick = () => {
        history.push('/admin/tambah-akun'); 
    };

    const handleDeleteUser = (id) => {
        const confirmation = window.confirm("Apakah Anda yakin ingin menghapus akun ini? Seluruh entri data yang berhubungan dengan akun role Guru akan ikut terhapus.");
        if (!confirmation) {
            return; // Jika pengguna memilih untuk tidak menghapus, keluar dari fungsi
        }

        if (id === user.data.userId) {
            console.error('User cannot delete their own account.');
            setErrorMessage("Anda sedang login dengan akun ini. Tidak dapat menghapus akun!");
            return;
        }

        fetch(`${baseUrl}user/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                } else {
                    console.error('Failed to delete user');
                }
            })
            .catch(error => {
                console.error('Error occurred while deleting user:', error);
            });
    };

    if (!isAdmin) {
        history.push('/login');
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
