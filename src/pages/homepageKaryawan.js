import React from 'react';
import { NavLink } from 'react-router-dom';
import SideBarKaryawan from '../components/sidebarKaryawan';
import CardInputData from '../components/cardInputData';
import CardReport from '../components/cardReports';
import '../styles/homepage.css';
import { faUserGraduate, faWallet, faBook } from '@fortawesome/free-solid-svg-icons';

export default function EntryPembelianBuku() {
    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan/>
            <div className="dashboard-homepage">
                <h2>Hi, Sonya!</h2>
                <h3>Input Data</h3>
                <div className='input-data'>
                    <NavLink to="/entry-transaksi-siswa" className="text-decoration-none">
                        <CardInputData icon={faUserGraduate} title="Transaksi Siswa" />
                    </NavLink>
                    <NavLink to="/entry-pembelian-buku" className="text-decoration-none">
                        <CardInputData icon={faBook} title="Pembelian Buku" />
                    </NavLink>
                    <NavLink to="/" className="text-decoration-none">
                        <CardInputData icon={faWallet} title="Gaji Guru" />
                    </NavLink>
                </div>
                <h3>Report</h3>
                <div class="row mb-3">
                    <div className="col-sm">
                        <NavLink to="/laporan-transaksi-siswa" className="text-decoration-none">
                            <CardReport title="Laporan Transaksi" />
                        </NavLink>
                    </div>
                    <div className="col-sm">
                        <NavLink to="/" className="text-decoration-none">
                            <CardReport title="Laporan Gaji Guru" />
                        </NavLink>
                    </div>
                </div>
                <div class="row mb-3">
                    <div className="col-sm">
                        <NavLink to="/" className="text-decoration-none">
                            <CardReport title="Laporan Iuran" />
                        </NavLink>
                    </div>
                    <div className="col-sm">
                        <NavLink to="/" className="text-decoration-none">
                            <CardReport title="Laporan Data Murid" />
                        </NavLink>
                    </div>
                </div>
                <div class="row mb-3">
                    <div className="col-sm">
                        <NavLink to="/" className="text-decoration-none">
                            <CardReport title="Laporan Pembayaran Kursus" />
                        </NavLink>
                    </div>
                    <div className="col-sm">
                        <NavLink to="/" className="text-decoration-none">
                            <CardReport title="Laporan Daftar Murid" />
                        </NavLink>
                    </div>
                </div>
                <div class="row mb-3">
                    <div className="col-sm">
                        <NavLink to="/laporan-keuangan-buku" className="text-decoration-none">
                            <CardReport title="Laporan Keuangan dan Stok Buku" />
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
