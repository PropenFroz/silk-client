import React, { useState, useEffect } from "react";
import Select from "react-select";
import SummaryModal from "./summaryModalUpdateGajiGuru";
import Berhasil from "./modalSuccessUpdateGajiGuru";
import { useHistory } from "react-router-dom";
import { fetchSiswa, fetchEntryGajiGuruById } from "../service/fetchDataService";

export default function UpdateGajiGuru({ id }) {
  const [formData, setFormData] = useState({
    siswa: "",
    uangKursus: "",
    tanggal: "",
    minggu1: "",
    minggu2: "",
    minggu3: "",
    minggu4: "",
    keterangan: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [siswaOptions, setSiswaOptions] = useState([]);
  const [selectedSiswa, setSelectedSiswa] = useState("");
  const [namaGuru, setNamaGuru] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchSiswa()
      .then((data) => {
        setSiswaOptions(
          data.map((siswa) => ({
            value: siswa.idSiswa,
            label: siswa.namaSiswa,
          }))
        );
      })
      .catch((error) => console.error("Error fetching siswa:", error));

    fetchEntryGajiGuruById(id)
      .then((data) => {
        const formattedDate = new Date(data.tanggal).toISOString().split("T")[0];
        const updatedData = { ...data, tanggal: formattedDate };
        setFormData(updatedData);
        setNamaGuru(data.entryGajiGuru.guru.namaGuru);
      })
      .catch((error) => console.error("Error fetching existing transaction data:", error));
  }, [id]);

  const handleSubmit = async () => {
    setSelectedSiswa(siswaOptions.find((option) => option.value === formData.siswa.idSiswa).label);

    const isFormValid = Object.values(formData).every((value) => value !== "");
    if (!isFormValid) {
      alert("Mohon lengkapi semua kolom sebelum mengirimkan data.");
      return;
    } else {
      try {
        const updatedFormData = {
          ...formData,
          tanggal: new Date(formData.tanggal).toISOString(),
          siswa: formData.siswa.idSiswa.toString(),
          uangKursus: formData.uangKursus.toString(),
          minggu1: formData.minggu1.toString(),
          minggu2: formData.minggu2.toString(),
          minggu3: formData.minggu3.toString(),
          minggu4: formData.minggu4.toString(),
          keterangan: formData.keterangan,
          feeGuru: (parseFloat(formData.uangKursus) * 0.4).toString(), // Hitung feeGuru sebagai 40% dari uangKursus
        };
        
        setFormData(updatedFormData);
        setShowModal(true);
      } catch (error) {
        console.error("Error updating entry data:", error);
      }
    }
  };
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    history.push("/laporan-gaji-guru");
  };

  return (
    <div className="frame">
      <div className="row">
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Nama Guru: {namaGuru}</label>
          </div>
        </div>
        <div className="col-sm"></div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="input-field">
            <label htmlFor="siswa" className="form-label">
              Siswa
            </label>
            <Select options={siswaOptions} value={siswaOptions.find((option) => option.value === formData.siswa.idSiswa)} isDisabled />
          </div>
        </div>
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Uang Kursus</label>
            <input type="number" className="form-control" name="uangKursus" onChange={(e) => setFormData({ ...formData, uangKursus: e.target.value })} value={formData.uangKursus} />
          </div>
        </div>
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Tanggal</label>
            <input type="date" className="form-control" name="tanggal" onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })} value={formData.tanggal} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Minggu 1</label>
            <input type="number" className="form-control" name="minggu1" onChange={(e) => setFormData({ ...formData, minggu1: e.target.value })} value={formData.minggu1} />
          </div>
        </div>
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Minggu 2</label>
            <input type="number" className="form-control" name="minggu2" onChange={(e) => setFormData({ ...formData, minggu2: e.target.value })} value={formData.minggu2} />
          </div>
        </div>
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Minggu 3</label>
            <input type="number" className="form-control" name="minggu3" onChange={(e) => setFormData({ ...formData, minggu3: e.target.value })} value={formData.minggu3} />
          </div>
        </div>
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Minggu 4</label>
            <input type="number" className="form-control" name="minggu4" onChange={(e) => setFormData({ ...formData, minggu4: e.target.value })} value={formData.minggu4} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Keterangan</label>
            <input type="text" className="form-control" name="keterangan" onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })} value={formData.keterangan} />
          </div>
        </div>
      </div>
      <button type="button" className="btn-submit" onClick={handleSubmit}>
        Submit
      </button>
      <SummaryModal
        id={id} 
        formData={formData}
        selectedSiswa={selectedSiswa}
        namaGuru={namaGuru}
        show={showModal}
        onHide={() => setShowModal(false)}
        onSuccess={() => {
            setShowSuccessModal(true);
        }}
      />
      <Berhasil
        show={showSuccessModal}
        onHide={handleSuccessModalClose}
      />
    </div>
  );
}
