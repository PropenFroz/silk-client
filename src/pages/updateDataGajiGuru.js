import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; //
import UpdateGajiGuru from '../components/updateGajiGuru';
import { useParams } from 'react-router-dom';
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';
import { config } from '../Constants'

export default function UpdateDataGajiGuru() {
    const baseUrl = config.url.API_BASE_URL + '/api/';

    const { id } = useParams(); // Ambil parameter ID dari URL menggunakan useParams

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

    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan/>
            <div className="dashboard-content">
                <h2>Update Data Gaji Guru</h2>
                <UpdateGajiGuru id={id} />
            </div>
        </div>
    )
}