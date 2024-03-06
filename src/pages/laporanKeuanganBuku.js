// LaporanKeuanganBuku.js
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Styles from '../styles/welcome';
import '../styles/laporan.css';
import TableLaporan from '../components/tableLaporanKeuanganBuku';
import Button from '../components/button';
import CustomDatePicker from '../components/datePicker'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

export default function LaporanKeuanganBuku() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <Styles>
           
            <Container>
            <h2>Laporan Keuangan & Stok Buku</h2>

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
                    <Button className="button">
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
