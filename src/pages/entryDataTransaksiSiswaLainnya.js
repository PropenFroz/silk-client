import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; //
import EntryData from '../components/entryDataTransaksiSiswaLainnya'
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';

export default function EntryDataTransaksiSiswaLainnya() {
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
            <h2>Masukkan Data Transaksi Lainnya Siswa</h2>
            <EntryData />
            </div>
        </div>
    )
}