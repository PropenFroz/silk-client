import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; //
import Sidebar from "../components/sidebarKaryawan";
import "../styles/laporan.css";
import Button from "../components/button";
import CustomDatePicker from "../components/datePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { fetchJurusanKursus } from "../service/fetchDataService";
import Select from 'react-select';
import TabelLaporanPembayaranKursus from "../components/tableLaporanPembayaranKursus";

export default function LaporanPembayaranKursus() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [jurusanKursus, setJurusanKursus] = useState([]);
    const [selectedJurusan, setSelectedJurusan] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const Auth = useAuth();
    const user = Auth.getUser();
    const history = useHistory();
  
    useEffect(() => {
        // Periksa apakah pengguna telah masuk saat komponen dimuat
        if (user == null) {
            // Jika pengguna tidak masuk, arahkan mereka ke halaman login
            history.push('/login');
        }
    }, [user, history]); // Tambahkan user dan history ke dependency array agar useEffect dipanggil ulang saat mereka berubah
  

    useEffect(() => {
        fetchJurusanKursus()
            .then(data => {
                setJurusanKursus(data.map(jurusan => ({ value: jurusan.idJurusanKursus, label: jurusan.namaJurusan })));
            })
            .catch(error => console.error('Error fetching jurusanKursus:', error));
    }, []);

    const handleExport = () => {
        if (!startDate || !endDate) {
            alert("Mohon isi kedua tanggal terlebih dahulu.");
            return;
        } else if (startDate > endDate) {
            alert("Tanggal mulai harus sebelum tanggal akhir.");
            return;
        }
        else {
            const formattedStartDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const formattedEndDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    
            const exportUrl = `http://localhost:8080/api/entry-transaksi-siswa/laporan-jurusan?startDate=${formattedStartDate}&endDate=${formattedEndDate}&idJurusan=${parseInt(selectedJurusan.value)}`;
            window.open(exportUrl, '_blank');
        }
    };

    const handleView = async () => {
        if (!startDate || !endDate) {
            alert("Mohon isi kedua tanggal terlebih dahulu.");
            return;
        } else if (startDate > endDate) {
            alert("Tanggal mulai harus sebelum tanggal akhir.");
            return;
        } else {
            try {
                const formattedStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];
                const formattedEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];
                const url = `http://localhost:8080/api/entry-transaksi-siswa/filter-by-date-jurusan?startDate=${formattedStartDate}&endDate=${formattedEndDate}&idJurusan=${parseInt(selectedJurusan.value)}`;
                const response = await fetch(url);
                const data = await response.json();
                console.log(transactions)
                setTransactions(data);
                setStartDate(startDate);
                setEndDate(endDate);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    };
    return (
        <div className="dashboard d-flex">
            <div>
                <Sidebar />
            </div>
            <div className="dashboard-content">
                <h2>Laporan Pembayaran Kursus</h2>
                <div className="button-group">
                    <div className="left-buttons">
                        <div className="col-sm" style={{marginRight: '10px'}}>
                            <Select
                                options={jurusanKursus}
                                value={selectedJurusan}
                                onChange={setSelectedJurusan}
                                placeholder="Pilih Jurusan"
                            />
                        </div>

                        <CustomDatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholder="Tanggal Awal" />

                        <CustomDatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholder="Tanggal Akhir" />

                        <Button className="button" >
                            <div className="button-base-2">
                                <div className="text-13" onClick={handleView}>Tampilkan</div>
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
                {/* <TabelLaporanGajiGuru transactions={transactions} startDate={startDate} endDate={endDate} setTransactions={setTransactions}/> */}
                <TabelLaporanPembayaranKursus transactions={transactions} selectedJurusan={selectedJurusan} startDate={startDate} endDate={endDate} setTransactions={setTransactions} />
            </div>
        </div>
    );
}