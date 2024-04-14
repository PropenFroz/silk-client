import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebarKaryawan";
import "../styles/laporan.css";
import Button from "../components/button";
import CustomDatePicker from "../components/datePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { fetchGuru } from "../service/fetchDataService";
import Select from "react-select";
import TabelLaporanGajiGuru from "../components/tableLaporanGajiGuru";

export default function LaporanGajiGuru() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guru, setGuru] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const url = "http://localhost:8080/api/";

  useEffect(() => {
    fetchGuru()
      .then((data) => {
        const options = data.map((guru) => ({ value: guru.idGuru, label: guru.namaGuru }));
        setGuru(options);
      })
      .catch((error) => console.error("Error fetching guru:", error));
  }, []);

  const handleExport = () => {
    if (!startDate || !endDate) {
      alert("Mohon isi kedua tanggal terlebih dahulu.");
      return;
    } else if (startDate > endDate) {
      alert("Tanggal mulai harus sebelum tanggal akhir.");
      return;
    } else {
      const formattedStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];
      const formattedEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];

      const exportUrl = `${url}entry-gaji-guru/filter?idGuru=${parseInt(selectedGuru.value)}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
      window.open(exportUrl, "_blank");
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
        const url = `http://localhost:8080/api/entry-gaji-guru/filter?idGuru=${parseInt(selectedGuru.value)}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
        const response = await fetch(url);
        const data = await response.json();
        setTransactions(data);
        console.log(transactions);
        setStartDate(startDate);
        setEndDate(endDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
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
            <div className="col-sm" style={{ marginRight: "10px" }}>
              {/* Ganti dropdown guru menjadi Select */}
              <Select options={guru} value={selectedGuru} onChange={setSelectedGuru} placeholder="Pilih Guru" />
            </div>

            <CustomDatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholder="Tanggal Awal" />

            <CustomDatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholder="Tanggal Akhir" />

            <Button className="button">
              <div className="button-base-2">
                <div className="text-13" onClick={handleView}>
                  Tampilkan
                </div>
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
        <TabelLaporanGajiGuru transactions={transactions} startDate={startDate} endDate={endDate} setTransactions={setTransactions} />
      </div>
    </div>
  );
}
