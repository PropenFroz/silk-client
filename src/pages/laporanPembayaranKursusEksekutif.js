import React, { useState, useEffect } from "react";
import { useAuth } from "../components/auth/context/AuthContext";
import { useHistory } from "react-router-dom"; //
import Sidebar from "../components/sidebarEksekutif";
import "../styles/laporan.css";
import Button from "../components/button";
import CustomDatePicker from "../components/datePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { fetchJurusanKursus } from "../service/fetchDataService";
import Select from "react-select";
import TabelLaporanPembayaranKursus from "../components/tableLaporanPembayaranKursusEksekutif";

import { config } from "../Constants";

export default function LaporanPembayaranKursusEksekutif() {
  const baseUrl = config.url.API_BASE_URL + "/api/";

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [jurusanKursus, setJurusanKursus] = useState([]);
  const [selectedJurusan, setSelectedJurusan] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showDataNotFound, setShowDataNotFound] = useState(false); // State untuk menampilkan pesan "Data tidak ditemukan"

  const Auth = useAuth();
  const user = Auth.getUser();
  const history = useHistory();

  useEffect(() => {
    if (user == null) {
      history.push("/login");
    } else {
      // Lakukan scroll ke atas setelah halaman dimuat
      window.scrollTo(0, 0);
    }
  }, [user, history]);

  useEffect(() => {
    fetchJurusanKursus()
      .then((data) => {
        setJurusanKursus(data.map((jurusan) => ({ value: jurusan.idJurusanKursus, label: jurusan.namaJurusan })));
      })
      .catch((error) => console.error("Error fetching jurusanKursus:", error));
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

      const exportUrl = `${baseUrl}entry-transaksi-siswa/laporan-jurusan?startDate=${formattedStartDate}&endDate=${formattedEndDate}&idJurusan=${parseInt(selectedJurusan.value)}`;
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
        const url = `${baseUrl}entry-transaksi-siswa/filter-by-date-jurusan?startDate=${formattedStartDate}&endDate=${formattedEndDate}&idJurusan=${parseInt(selectedJurusan.value)}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(transactions);
        setTransactions(data);
        setStartDate(startDate);
        setEndDate(endDate);
        setShowDataNotFound(data.length === 0); // Set state showDataNotFound berdasarkan panjang data yang dimuat
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
        <h2>Laporan Pembayaran Kursus</h2>
        <div className="button-group">
          <div className="left-buttons">
            <div className="col-sm" style={{ marginRight: "10px" }}>
              <Select options={jurusanKursus} value={selectedJurusan} onChange={setSelectedJurusan} placeholder="Pilih Jurusan" />
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
        {showDataNotFound && <div>Data tidak ditemukan!</div>}
        <TabelLaporanPembayaranKursus transactions={transactions} selectedJurusan={selectedJurusan} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
}
