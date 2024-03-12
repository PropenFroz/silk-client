import React, { useState } from 'react';
import Sidebar from '../components/sidebarKaryawan';
import '../styles/laporan.css';
import TableLaporan from '../components/tableLaporanTransaksiSiswa';
import Button from '../components/button';
import CustomDatePicker from '../components/datePicker'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export default function LaporanTransaksi() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const url = 'https://silk-purwa.up.railway.app/api/';

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
    
            const exportUrl = `${url}entry-transaksi-siswa/laporan?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
            window.open(exportUrl, '_blank');
        }
    };

    const handleView = async () => {
        if (!startDate || !endDate) {
            alert("Mohon isi kedua tanggal terlebih dahulu.");
            return;
        }

        if (startDate > endDate) {
            alert("Tanggal mulai harus sebelum tanggal akhir.");
            return;
        }

        try {
            const formattedStartDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const formattedEndDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const url = `https://silk-purwa.up.railway.app/api/entry-transaksi-siswa/filter-by-date?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
            const response = await fetch(url);
            const data = await response.json();
            setTransactions(data);
            setStartDate(startDate);
            setEndDate(endDate);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="dashboard d-flex">
            <div>
                <Sidebar/>
            </div>
            <div className="dashboard-laporan">
                <h2>Laporan Transaksi Siswa</h2>
                <div className="button-group">
                    <div className="left-buttons">
                        <CustomDatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            placeholder="Tanggal Awal"
                        />

                        <CustomDatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            placeholder="Tanggal Akhir"
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
                <TableLaporan transactions={transactions} startDate={startDate} endDate={endDate} setTransactions={setTransactions} />
            </div>
        </div>
    )
}
