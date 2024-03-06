import React, { useState } from 'react';
import Styles from '../styles/welcome';
import '../styles/laporan.css';
import TableLaporan from '../components/TabelLaporanTransaksiSiswa';
import Button from '../components/button';
import CustomDatePicker from '../components/datePicker'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

export default function LaporanTransaksi() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleExport = () => {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        const url = `http://localhost:8080/api/entry-transaksi-siswa/laporan?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
        window.open(url, '_blank');
    };

    return (
        <Styles>
    
            <Container>
                <h2>Laporan Transaksi</h2>

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

                        <Button className="button">
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

                <TableLaporan />
            </Container>
        </Styles>
    )
}
