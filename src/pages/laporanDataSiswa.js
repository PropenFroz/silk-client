import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/sidebarKaryawan';
import '../styles/laporan.css';
import TableLaporanDataSiswa from '../components/tableLaporanDataSiswa';
import Button from '../components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { config } from '../Constants';

export default function LaporanDataSiswa() {
    const baseUrl = config.url.API_BASE_URL + '/api/';
    const history = useHistory();

    const [year, setYear] = useState(new Date().getFullYear());
    const [laporanDataSiswa, setLaporanDataSiswa] = useState([]);

    useEffect(() => {
        // Periksa apakah pengguna telah masuk saat komponen dimuat
        const user = localStorage.getItem('user'); // Asumsi pengguna sudah login dan token tersimpan di local storage
        if (!user) {
            // Jika pengguna tidak masuk, arahkan mereka ke halaman login
            history.push('/login');
        } else {
            // Jika pengguna masuk, panggil handleView secara otomatis untuk menampilkan data saat pertama kali dimuat
            handleView();
        }
    }, [history]); // Tambahkan history ke dependency array agar useEffect dipanggil ulang saat berubah

    const handleExport = () => {
        // Logic untuk mengekspor data
    };

    const handleView = async () => {
        // Logic untuk menampilkan data
        try {
            const response = await fetch(`${baseUrl}siswa/jumlah/${year}`);
            const data = await response.json();
            setLaporanDataSiswa(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="dashboard d-flex">
            <div>
                <Sidebar/>
            </div>
            <div className="dashboard-content">
                <h2>Laporan Data Siswa</h2>
                <div className="button-group">
                    <div className="left-buttons">
                        <input
                            type="number"
                            className="form-control" 
                            value={year}
                            onChange={e => setYear(parseInt(e.target.value))}
                            style={{ marginRight: '10px', marginBottom: '10px' }}
                        />

                        <Button className="button" onClick={handleView}>
                            <div className="button-base-2">
                                <div className="text-13">Tampilkan</div>
                            </div>
                        </Button>
                    </div>
                    <div className="right-buttons">
                        <Button className="button" onClick={handleExport}>
                            <div className="button-base">
                                <FontAwesomeIcon icon={faDownload} />
                                <div className="text-12">Export</div>
                            </div>
                        </Button>
                    </div>
                </div>
                <TableLaporanDataSiswa laporanDataSiswa={laporanDataSiswa} />
            </div>
        </div>
    )
}
