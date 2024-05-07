import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebarKaryawan";
import TabelLaporanBuku from "../components/tableLaporanBuku";
import Button from "../components/button";
import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; //
import { Link } from 'react-router-dom'; // Jika menggunakan React Router, pastikan untuk mengimport Link jika belum

export default function LaporanBuku() {
    const Auth = useAuth();
    const user = Auth.getUser();
    const history = useHistory();
  
    useEffect(() => {
        // Periksa apakah pengguna telah masuk saat komponen dimuat
        if (user == null) {
            // Jika pengguna tidak masuk, arahkan mereka ke halaman login
            history.push('/login');
        } else {
            // Lakukan scroll ke atas setelah halaman dimuat
            window.scrollTo(0, 0);
        }
    }, [user, history]); // Tambahkan user dan history ke dependency array agar useEffect dipanggil ulang saat mereka berubah


    return (
        <div className="dashboard d-flex">
            <div>
                <Sidebar />
            </div>
            <div className="dashboard-content">
                <h2>Laporan Buku</h2>
                <Link to="/entry-tambah-buku">
                    <Button className="button" >
                        <div className="button-base-2">
                            <div className="text-13" >Tambah Buku</div>
                        </div>
                    </Button>
                </Link>
                {/* Tabel laporan buku */}
                <TabelLaporanBuku />
            </div>
        </div>
    );
}
