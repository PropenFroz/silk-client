import React from 'react';
import SideBarKaryawan from '../components/sidebarKaryawan';
import CardInputData from '../components/cardInputData';
import CardReport from '../components/cardReports';
import '../styles/homepage.css';
import { faUserGraduate, faWallet, faBook } from '@fortawesome/free-solid-svg-icons';

export default function EntryPembelianBuku() {
    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan/>
            <div className="dashboard-content">
                <h2>Hi, Sonya!</h2>
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
