import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebarKaryawan";
import "../styles/laporan.css";
import Button from "../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { fetchJurusanKursus } from "../service/fetchDataService";
import Select from 'react-select';
import TabelLaporanIuranSiswa from "../components/tableLaporanIuranSiswa";

export default function LaporanIuranSiswa() {
    const [jurusanKursus, setJurusanKursus] = useState([]);
    const [selectedJurusan, setSelectedJurusan] = useState(null);
    const [selectedTahun, setSelectedTahun] = useState('');
    const [transactions, setTransactions] = useState([]);

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
    
            const exportUrl = `${url}entry-transaksi-siswa/laporan?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
            window.open(exportUrl, '_blank');
        }
    };

    const handleView = async () => {
        try {
            const url = `http://localhost:8080/api/iuran-siswa/filter?idJurusanKursus=${selectedJurusan.value}&tahun=${selectedTahun}`;
            const response = await fetch(url);
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleTahunChange = (event) => {
        setSelectedTahun(event.target.value);
    };

    return (
        <div className="dashboard d-flex">
            <div>
                <Sidebar />
            </div>
            <div className="dashboard-content">
                <h2>Laporan Iuran Siswa</h2>
                <div className="button-group">
                    <div className="left-buttons">
                        <div className="col-sm" style={{marginRight: '10px'}}>
                        <Select
                            options={jurusanKursus}
                            value={selectedJurusan}
                            onChange={setSelectedJurusan}
                            placeholder="Pilih Jurusan"
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    width: '100%',
                                    minWidth: '200px',
                                })
                            }}
                        />
                        </div>

                        <input 
                            type="number" 
                            className="form-control" 
                            name="tahun" 
                            value={selectedTahun} 
                            onChange={handleTahunChange}
                            placeholder="Masukkan Tahun"
                            style={{ marginRight: '10px' }}
                        />

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
                <TabelLaporanIuranSiswa transactions={transactions} setTransactions={setTransactions} selectedJurusan={selectedJurusan} tahun={selectedTahun}/>
            </div>
        </div>
    );
}