import React, { useState } from 'react';
import Sidebar from '../components/sidebarKaryawan';
import Styles from '../styles/welcome';
import '../styles/laporan.css';
import TableLaporan from '../components/tableLaporanKeuanganBuku';
import Button from '../components/button';
import CustomDatePicker from '../components/datePicker'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export default function LaporanKeuanganBuku() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

  return ( 
    <div className="dashboard d-flex">
    	<div>
      	<Sidebar/>
      </div>
      <div className="dashboard-content">
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
      </div>
      
    </div>
  );
}
