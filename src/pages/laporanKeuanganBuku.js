import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Container from 'react-bootstrap/Container';
import Styles from '../styles/welcome';
import '../styles/laporanKeuanganBuku.css'; // Import CSS file
import TableLaporan from '../components/tableLaporan'; 
import Button from '../components/button'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCalendarDay } from '@fortawesome/free-solid-svg-icons'


export default function LaporanKeuanganBuku() {
    return (
        <Styles>
            <Navbar welcome={true} />
            <div className="circle1"></div>
            <div id="welcome">
                <Container>
                    <div className="gap"></div>
                    <h2>Laporan Keuangan & Stok Buku</h2>

                    <div className="button-group">
                        <div className="left-buttons">
                            {/* Tambahkan tombol bulan dan tahun di sini */}
                            <div className="text-input">
                                <FontAwesomeIcon icon={faCalendarDay} />
                                <div className="placeholder">Tanggal Awal</div>
                            </div>
                            <div className="text-input">
                                <FontAwesomeIcon icon={faCalendarDay} />
                                <div className="placeholder">Tanggal Akhir</div>
                            </div>
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

                    <TableLaporan /> {/* Use TableLaporan component */}
                    <div className="gap"></div>
                </Container>
            </div>
            <Footer />
        </Styles>
    )
}
