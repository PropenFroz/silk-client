import React, { useState, useEffect } from "react";
import { useAuth } from "../components/auth/context/AuthContext";
import { useHistory } from "react-router-dom"; //
import Sidebar from "../components/sidebarEksekutif";
import "../styles/laporan.css";
import Button from "../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { fetchJurusanKursus } from "../service/fetchDataService";
import Select from "react-select";
import TabelLaporanIuranSiswaEksekutif from "../components/tableLaporanIuranSiswaEksekutif";
import { config } from "../Constants";

export default function LaporanIuranSiswaEksekutif() {
  const baseUrl = config.url.API_BASE_URL + "/api/";

  const [jurusanKursus, setJurusanKursus] = useState([]);
  const [selectedJurusan, setSelectedJurusan] = useState(null);
  const [selectedTahun, setSelectedTahun] = useState("");
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
    const exportUrl = `${baseUrl}iuran-siswa/laporan-jurusan-filter?idJurusanKursus=${selectedJurusan.value}&tahun=${selectedTahun}`;
    window.open(exportUrl, "_blank");
  };

  const handleView = async () => {
    try {
      const url = `${baseUrl}iuran-siswa/filter?idJurusanKursus=${selectedJurusan.value}&tahun=${selectedTahun}`;
      const response = await fetch(url);
      const data = await response.json();
      setTransactions(data);
      setShowDataNotFound(data.length === 0); // Set state showDataNotFound berdasarkan panjang data yang dimuat
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
            <div className="col-sm" style={{ marginRight: "10px" }}>
              <Select
                options={jurusanKursus}
                value={selectedJurusan}
                onChange={setSelectedJurusan}
                placeholder="Pilih Jurusan"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: "100%",
                    minWidth: "200px",
                  }),
                }}
              />
            </div>

            <input type="number" className="form-control" name="tahun" value={selectedTahun} onChange={handleTahunChange} placeholder="Masukkan Tahun" style={{ marginRight: "10px" }} />

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
        <TabelLaporanIuranSiswaEksekutif transactions={transactions} selectedJurusan={selectedJurusan} tahun={selectedTahun} />
      </div>
    </div>
  );
}