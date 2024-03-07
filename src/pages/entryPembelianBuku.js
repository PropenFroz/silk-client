import React from 'react';
import EntryData from '../components/entryPembelianBuku'
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';

export default function EntryPembelianBuku() {
    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan/>
            <div className="dashboard-content">
            <h2>Masukkan Data Pembelian Buku</h2>
            <EntryData />
            </div>
        </div>
    )
}