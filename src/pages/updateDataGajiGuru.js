import React from 'react';
import UpdateGajiGuru from '../components/updateGajiGuru';
import { useParams } from 'react-router-dom';
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';

export default function UpdateDataGajiGuru() {
    const { id } = useParams(); // Ambil parameter ID dari URL menggunakan useParams

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