import React from 'react';
import UpdateData from '../components/updateDataKursusSiswa';
import { useParams } from 'react-router-dom';
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';

export default function UpdateDataTransaksiSiswa() {
    const { id } = useParams();

    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan/>
            <div className="dashboard-content">
                <h2>Update Data Transaksi Pembayaran</h2>
                <UpdateData id={id} />
            </div>
        </div>
    )
}
