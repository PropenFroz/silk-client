import React from 'react';
import EntryData from '../components/entryDataTransaksiSiswaLainnya'
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';

export default function EntryDataTransaksiSiswaLainnya() {
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