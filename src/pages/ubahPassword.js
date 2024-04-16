import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; //
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const Auth = useAuth();
    const user = Auth.getUser();
    const history = useHistory();

    useEffect(() => {
        // Periksa apakah pengguna telah masuk saat komponen dimuat
        if (user == null) {
            // Jika pengguna tidak masuk, arahkan mereka ke halaman login
            history.push('/login');
        }
    }, [user, history]); // Tambahkan user dan history ke dependency array agar useEffect dipanggil ulang saat mereka berubah


    const handleChangePassword = async () => {
        // Validasi password dan kirim permintaan ubah password ke server
        if (newPassword !== confirmNewPassword) {
            setMessage('Password baru tidak cocok dengan konfirmasi password.');
            return;
        }

        try {
            const response = await fetch('https://localhost:8080/api/user/2', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: newPassword
                })
            });

            if (response.ok) {
                setMessage('Password berhasil diubah.');
            } else {
                setMessage(await response.text());
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            setMessage('Terjadi kesalahan saat mengirim permintaan.');
        }

        // Reset form setelah berhasil mengubah password
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan/>
            <div className="dashboard-content">
                <h2>Ubah Password</h2>
                <div className={message ? "message error" : ""}>
                    {message && <p>{message}</p>}
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Password Saat Ini:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">Password Baru:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmNewPassword">Konfirmasi Password Baru:</label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Ubah Password</button>
                </form>
            </div>
        </div>
    );
}
