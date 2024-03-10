import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SummaryModal from "./summaryModalUpdatePembelianBuku";
import UpdateBerhasil from "./modalUpdate";
import "../styles/updatePembelianBuk.css";
import { fetchBukuPurwacaraka } from "../service/fetchDataService";

export default function UpdatePembelianBuku() {
  const [formData, setFormData] = useState({
    bukuPurwacaraka: "",
    tanggalBeli: "",
    jumlahBeli: "",
    tanggalJual: "",
    jumlahJual: "",
    hargaBeli: "",
    hargaJual: "",
  });

  const [namaBuku, setNamaBuku] = useState('');
  const [namaJurusan, setnamaJurusan] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { id } = useParams();
  const [bukuPurwacaraka, setBukuPurwacaraka] = useState([]);

  useEffect(() => {
    fetch(`https://silk-purwa.up.railway.app/api/entry-transaksi-buku/get/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const formattedTanggalBeli = new Date(data.tanggalBeli).toISOString().split("T")[0];
        const formattedTanggalJual = new Date(data.tanggalJual).toISOString().split("T")[0];
        setFormData({
          bukuPurwacaraka: data.bukuPurwacaraka,
          tanggalBeli: formattedTanggalBeli,
          jumlahBeli: data.jumlahBeli,
          tanggalJual: formattedTanggalJual,
          jumlahJual: data.jumlahJual,
          hargaBeli: data.hargaBeli,
          hargaJual: data.hargaJual,
        });
      })
      .catch((error) => {
        console.error("Error fetching transaction:", error);
      });
  }, [id]);

  useEffect(() => {
    fetchBukuPurwacaraka()
      .then((data) => {
        setBukuPurwacaraka(data);
      })
      .catch((error) => console.error("Error fetching gradeKursus:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setNamaBuku(bukuPurwacaraka.find(buku => buku.idBukuPurwacaraka === parseInt(formData.bukuPurwacaraka)).namaBuku);
    setnamaJurusan(bukuPurwacaraka.find(buku => buku.idBukuPurwacaraka === parseInt(formData.bukuPurwacaraka)).jurusanKursus.namaJurusan);

    const isFormValid = Object.values(formData).every((value) => value !== "");
    if (!isFormValid) {
      alert("Mohon lengkapi semua kolom sebelum mengirimkan data.");
      return;
    } else {
      console.log("Form data:", formData);
      setShowModal(true);
    }
  };

  return (
    <div className="frame">
      <div className="row">
        <div className="col-sm">
          <div className="input-field">
            <label htmlFor="bukuPurwacaraka" className="form-label">
              Nama Buku
            </label>
            <select className="form-select" name="bukuPurwacaraka" onChange={handleChange}>
              {bukuPurwacaraka.map((bukuPurwacaraka) => (
                <option key={bukuPurwacaraka.idBukuPurwacaraka} value={bukuPurwacaraka.idBukuPurwacaraka} selected={parseInt(formData.bukuPurwacaraka) === parseInt(bukuPurwacaraka.idBukuPurwacaraka)}>
                  {bukuPurwacaraka.namaBuku}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm"></div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Tanggal Beli</label>
            <input type="date" className="form-control" name="tanggalBeli" value={formData.tanggalBeli} onChange={handleChange} />
          </div>
        </div>
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Jumlah Beli</label>
            <input type="number" className="form-control" name="jumlahBeli" value={formData.jumlahBeli} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Tanggal Jual</label>
            <input type="date" className="form-control" name="tanggalJual" value={formData.tanggalJual} onChange={handleChange} />
          </div>
        </div>
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Jumlah Jual</label>
            <input type="number" className="form-control" name="jumlahJual" value={formData.jumlahJual} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Harga Beli</label>
            <input type="number" className="form-control" name="hargaBeli" value={formData.hargaBeli} onChange={handleChange} />
          </div>
        </div>
        <div className="col-sm">
          <div className="input-field">
            <label className="form-label">Harga Jual</label>
            <input type="number" className="form-control" name="hargaJual" value={formData.hargaJual} onChange={handleChange} />
          </div>
        </div>
      </div>

      <button type="button" className="btn-submit" onClick={handleSubmit}>
        Submit
      </button>
      <SummaryModal
        formData={formData}
        namaBuku={namaBuku}
        namaJurusan={namaJurusan}
        id={id}
        show={showModal}
        onHide={() => setShowModal(false)}
        onSuccess={() => {
          setShowSuccessModal(true);
        }}
      />
      <UpdateBerhasil
        show={showSuccessModal}
        onHide={() => {
          setShowSuccessModal(false);
          window.location.href = "/silk/laporan-keuangan-buku";
        }}
      />
    </div>
  );
}
