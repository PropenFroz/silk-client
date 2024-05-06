import React, { useState, useEffect } from 'react';
import SideBarKaryawan from '../components/sidebarKaryawan';
import CardInputData from '../components/cardInputData';
import CardReport from '../components/cardReports';
import '../styles/homepage.css';
import { faUserGraduate, faWallet, faBook } from '@fortawesome/free-solid-svg-icons';


import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

import { config } from '../Constants'

export default function EntryPembelianBuku() {
    const baseUrl = config.url.API_BASE_URL + '/api/';

    const Auth = useAuth();
    const user = Auth.getUser();

    const history = useHistory(); // Initialize history
    const [isKaryawan, setIsKaryawan] = useState(true);

    useEffect(() => {
        if (user != null) {
            setIsKaryawan(user.data.role[0] === 'Karyawan');
        }
    }, []);

    if (user == null) {
        history.push('/login');
        return null;
    }

    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan/>
            <div className="dashboard-content">
                <h2>Hi, {user && user.data.sub}!</h2>
                <h3>Input Data</h3>
                <div className='input-data'>
                    <CardInputData icon={faUserGraduate} title="Transaksi Pendaftaran" link="/entry-transaksi-siswa"/>
                    <CardInputData icon={faUserGraduate} title="Transaksi Kursus" link="/entry-transaksi-siswa-kursus"/>
                    <CardInputData icon={faUserGraduate} title="Transaksi Lainnya" link="/entry-transaksi-siswa-lainnya"/>
                    <CardInputData icon={faBook} title="Pembelian Buku" link="/entry-pembelian-buku" />
                    <CardInputData icon={faWallet} title="Gaji Guru"  link="/entry-gaji-guru" />
                </div>
                <h3>Report</h3>
                <div class="row mb-3">
                    <div className="col-sm">
                        <CardReport title="Laporan Transaksi" link="/laporan-transaksi-siswa" />
                    </div>
                    <div className="col-sm">
                        <CardReport title="Laporan Gaji Guru"link="/laporan-gaji-guru"></CardReport>
                    </div>
                </div>
                <div class="row mb-3">
                    <div className="col-sm">
                        <CardReport title="Laporan Iuran" link="/laporan-iuran-siswa" />
                    </div>
                    <div className="col-sm">
                        <CardReport title="Laporan Data Murid" link="/laporan-data-siswa" ></CardReport>
                    </div>
                </div>
                <div class="row mb-3">
                    <div className="col-sm">
                        <CardReport title="Laporan Pembayaran Kursus" link="/laporan-pembayaran-kursus"/>
                    </div>
                    <div className="col-sm">
                        <CardReport title="Laporan Daftar Murid" link="/laporan-daftar-siswa" ></CardReport>
                    </div>
                </div>
                <div class="row mb-3">
                    <div className="col-sm">
                        <CardReport title="Laporan Keuangan dan Stok Buku" link="/laporan-keuangan-buku"/>
                    </div>
                    <div className="col-sm">
                        <CardReport title="Laporan Buku" link="/laporan-buku" ></CardReport>
                    </div>
                </div>
            </div>
        </div>
    )
}