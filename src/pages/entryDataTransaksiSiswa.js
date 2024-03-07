import React from 'react';
import EntryData from '../components/entryDataTransaksiSiswa'
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';

export default function EntryDataTransaksiSiswa() {
    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan/>
            <div className="dashboard-content">
            <h2>Masukkan Data Transaksi Pembayaran</h2>
            <EntryData />
            </div>
        </div>
    )
}