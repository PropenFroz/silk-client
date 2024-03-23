import React, { useState, useEffect } from 'react';
import SideBarKaryawan from '../components/sidebarKaryawan';
import CardInputData from '../components/cardInputData';
import CardReport from '../components/cardReports';
import '../styles/homepage.css';
import { faUserGraduate, faWallet, faBook } from '@fortawesome/free-solid-svg-icons';


import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

export default function EntryPembelianBuku() {

    const Auth = useAuth();
    const user = Auth.getUser();

    const history = useHistory(); // Initialize history
    const [isKaryawan, setIsKaryawan] = useState(true);

    useEffect(() => {
        if (user != null) {
            setIsKaryawan(user.data.role[0] === 'Karyawan');
        }
    }, []);

    // if (!isKaryawan) {
    //     history.push('/homepage-karyawan');
    //     return null;
    // }
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
                    <CardInputData icon={faUserGraduate} title="Transaksi Siswa" />
                    <CardInputData icon={faBook} title="Pembelian Buku" />
                    <CardInputData icon={faWallet} title="Gaji Guru" />
                </div>
                <h3>Report</h3>
                <div class="row mb-3">
                    <div className="col-sm">
                        <CardReport title="Laporan Transaksi" />
                    </div>
                    <div className="col-sm">
                        <CardReport title="Laporan Gaji Guru" ></CardReport>
                    </div>
                </div>
                <div class="row mb-3">
                    <div className="col-sm">
                        <CardReport title="Laporan Iuran" />
                    </div>
                    <div className="col-sm">
                        <CardReport title="Laporan Data Murid" ></CardReport>
                    </div>
                </div>
                <div class="row mb-3">
                    <div className="col-sm">
                        <CardReport title="Laporan Pembayaran Kursus" />
                    </div>
                    <div className="col-sm">
                        <CardReport title="Laporan Daftar Murid" ></CardReport>
                    </div>
                </div>
                <div class="row mb-3">
                    <div className="col-sm">
                        <CardReport title="Laporan Keuangan dan Stok Buku" />
                    </div>
                </div>
            </div>
        </div>
    )
}
