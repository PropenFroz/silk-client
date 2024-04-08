import React from 'react';
import EntryData from '../components/entryDataTransaksiSiswaKursus'
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';

export default function EntryDataTransaksiSiswaKursus() {
    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan/>
            <div className="dashboard-content">
            <h2>Masukkan Data Transaksi Kursus Siswa</h2>
            <EntryData />
            </div>
        </div>
    )
}