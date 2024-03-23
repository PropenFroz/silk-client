import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebarAdmin'; // Import Sidebar component
import "../../styles/style.css";

import { useAuth } from '../../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

function TambahAkun() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        role: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const Auth = useAuth();
    const user = Auth.getUser();

    const [users, setUsers] = useState([]);
    const history = useHistory(); // Initialize history
    const [isAdmin, setIsAdmin] = useState(true);

    useEffect(() => {
        if (user != null) {
            setIsAdmin(user.data.role[0] === 'Admin');
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://silk-purwa.up.railway.app/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                // Tangkap pesan error dari respons
                const errorMessage = await response.text();
                // Tampilkan pesan error kepada pengguna
                setErrorMessage(errorMessage);
                return;
            }
            

            // Handle success response here if needed
            setSuccessMessage('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
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
                <h2>Create User</h2>
                {/* Tampilkan pesan kesalahan jika ada */}
                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Pilih Role --</option>
                            <option value="Admin">Admin</option>
                            <option value="Karyawan">Karyawan</option>
                            <option value="Eksekutif">Eksekutif</option>
                            <option value="Guru">Guru</option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default TambahAkun;
