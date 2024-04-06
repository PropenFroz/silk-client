import React from 'react';
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';
import EntryDetailGajiGuru from '../components/entryDetailGajiGuru';

export default function EntryGajiGuru() {
    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan/>
            <div className="dashboard-content">
                <h2>Masukkan Data Gaji Guru</h2>
                <EntryDetailGajiGuru />
            </div>
        </div>
    )
}