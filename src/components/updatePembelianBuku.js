import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/updatePembelianBuku.css";
import { fetchBukuPurwacaraka } from "../service/fetchDataService"; 

export default function UpdatePembelianBuku({ }) {
    const [formData, setFormData] = useState({
        idBukuPurwacaraka: "",
        tanggalBeli: "",
        jumlahBeli: "",
        tanggalJual: "",
        jumlahJual: "",
        hargaBeli: "",
        hargaJual: ""
    });

    const { id } = useParams();
    const [bukuPurwacaraka, setBukuPurwacaraka] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/entry-transaksi-buku/get/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then(data => {
                const formattedTanggalBeli = new Date(data.tanggalBeli).toISOString().split('T')[0];
                const formattedTanggalJual = new Date(data.tanggalJual).toISOString().split('T')[0];
                setFormData({
                    idBukuPurwacaraka: data.bukuPurwacaraka.idBukuPurwacaraka,
                    tanggalBeli: formattedTanggalBeli,
                    jumlahBeli: data.jumlahBeli,
                    tanggalJual: formattedTanggalJual,
                    jumlahJual: data.jumlahJual,
                    hargaBeli: data.hargaBeli,
                    hargaJual: data.hargaJual
                });
            })
            .catch(error => {
                console.error('Error fetching transaction:', error);
            });
    }, [id]);

    useEffect(() => {
        fetchBukuPurwacaraka()
            .then(data => {
                setBukuPurwacaraka(data);
            })
            .catch(error => console.error('Error fetching gradeKursus:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="frame">
          <div className="row">
            <div className="col-sm">
              <div className="input-field">
                <label htmlFor="bukuPurwacaraka" className="form-label">
                  Nama Buku
                </label>
                <select className="form-select" name="bukuPurwacaraka" onChange={handleChange} value={formData.idBukuPurwacaraka}>
                    {bukuPurwacaraka.map(bukuPurwacaraka => (
                        <option key={bukuPurwacaraka.idBukuPurwacara} value={bukuPurwacaraka.idBukuPurwacara} selected={formData.idBukuPurwacaraka == bukuPurwacaraka.idBukuPurwacara}>
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
    
          {/* Tombol submit dan modals */}
        </div>
      );
}