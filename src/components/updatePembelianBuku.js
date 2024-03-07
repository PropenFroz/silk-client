import React, { useState, useEffect } from "react";
import "../styles/updatepembelianbuku.css";
// import SummaryModal from './summaryModal';
import Berhasil from "./modal";
import { fetchJurusanKursus } from "../service/fetchDataService";

export default function UpdatePembelianBuku() {
  const [formData, setFormData] = useState({
    jenisTransaksi: 1,
    tanggalPembayaran: "",
    namaSiswa: "",
    jurusanKursus: 1,
    gradeKursus: 1,
    uangPendaftaran: "",
    uangKursus: "",
    uangBuku: "",
    cash: "",
    transfer: "",
    keterangan: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [jurusanKursus, setJurusanKursus] = useState([]);

  useEffect(() => {
    fetchJurusanKursus()
      .then((data) => {
        setJurusanKursus(data);
      })
      .catch((error) => console.error("Error fetching jurusanKursus:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

//   const handleSubmit = () => {
//     const isFormValid = Object.values(formData).every((value) => value !== "");
//     if (!isFormValid) {
//       alert("Mohon lengkapi semua kolom sebelum mengirimkan data.");
//       return;
//     } else {
//       setShowModal(true);
//     }
//   };

  return (
    <div className="frame">
      <div class="row">
        <div className="col-sm">
          <div className="input-field">
            <label htmlFor="jurusanKursus" className="form-label">
              Nama Buku
            </label>
            <select className="form-select" name="jurusanKursus" onChange={handleChange} defaultValue={1}>
              {jurusanKursus.map((jurusan) => (
                <option key={jurusan.idJurusanKursus} value={jurusan.idJurusanKursus}>
                  {jurusan.namaJurusan}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm"></div>
      </div>
      <div class="row">
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Tanggal Beli</label>
            <input type="date" className="form-control" name="tanggalPembayaran" onChange={handleChange} />
          </div>
        </div>
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Jumlah Beli</label>
            <input type="number" className="form-control" name="uangPendaftaran" onChange={handleChange} />
          </div>
        </div>
      </div>
      <div class="row">
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Tanggal Jual</label>
            <input type="date" className="form-control" name="tanggalPembayaran" onChange={handleChange} />
          </div>
        </div>
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Jumlah Jual</label>
            <input type="number" className="form-control" name="uangPendaftaran" onChange={handleChange} />
          </div>
        </div>
      </div>
      <div class="row">
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Harga Beli</label>
            <input type="number" className="form-control" name="cash" onChange={handleChange} />
          </div>
        </div>
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Harga Jual</label>
            <input type="number" className="form-control" name="transfer" onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* <button type="button" className="btn-submit" onClick={handleSubmit}>
        Submit
      </button> */}
      {/* <SummaryModal
        formData={formData}
        show={showModal}
        onHide={() => setShowModal(false)}
        onSuccess={() => {
          setShowSuccessModal(true);
        }}
      /> */}
      <Berhasil
        show={showSuccessModal}
        onHide={() => {
          setShowSuccessModal(false);
        }}
      />
    </div>
  );
}
