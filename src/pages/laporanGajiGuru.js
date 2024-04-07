import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebarKaryawan";
import "../styles/laporan.css";
import Button from "../components/button";
import CustomDatePicker from "../components/datePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { fetchGuru } from "../service/fetchDataService"; 
import TabelLaporanGajiGuru from "../components/tableLaporanGajiGuru";

export default function LaporanGajiGuru() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guru, setGuru] = useState([]);
    const [selectedGuru, setSelectedGuru] = useState("1");
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchGuru()
            .then(data => {
                setGuru(data);
            })
            .catch(error => console.error('Error fetching guru:', error));
    }, []);

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
                const url = `http://localhost:8080/api/entry-gaji-guru/filter?idGuru=${parseInt(selectedGuru)}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
                const response = await fetch(url);
                const data = await response.json();
                setTransactions(data);
                console.log(transactions)
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
                <h2>Laporan Gaji Guru</h2>
                <div className="button-group">
                <div className="left-buttons">
                    <div className="col-sm" style={{marginRight: '10px'}}>
                        <select className="form-select" name="guru" onChange={(e) => setSelectedGuru(e.target.value)} defaultValue={1}>
                            {guru.map(guru => (
                                <option key={guru.idGuru} value={guru.idGuru}>{guru.namaGuru}</option>
                            ))}
                        </select>
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
                    <Button className="button" >
                    <div className="button-base">
                        <FontAwesomeIcon icon={faDownload} />
                        <div className="text-12">Export</div>
                    </div>
                    </Button>
                </div>
                </div>
                <TabelLaporanGajiGuru transactions={transactions} startDate={startDate} endDate={endDate} setTransactions={setTransactions}/>
            </div>
        </div>
    );
}
