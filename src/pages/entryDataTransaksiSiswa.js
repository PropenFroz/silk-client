import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; //
import EntryData from '../components/entryDataTransaksiSiswa'
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';

import { config } from '../Constants'


export default function EntryDataTransaksiSiswa() {
    const baseUrl = config.url.API_BASE_URL + '/api/';

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

    // Render komponen jika pengguna telah masuk
    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan />
            <div className="dashboard-content">
                <h2>Masukkan Data Transaksi Pendaftaran Siswa</h2>
                <EntryData />
            </div>
        </div>
    );
}