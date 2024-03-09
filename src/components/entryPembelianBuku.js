import React, { useState, useEffect } from "react";
import '../styles/EntryData.css';
import SummaryModal from './summaryModalEntryPembelianBuku';
import Berhasil from './modal';
import { fetchBukuPurwacaraka } from "../service/fetchDataService"; 

export default function EntryData() { 
    const [formData, setFormData] = useState({
        bukuPurwacaraka: 1,
        tanggalBeli: '',
        jumlahBeli: '',
        tanggalJual: '',
        jumlahJual: '',
        hargaBeli: '',
        hargaJual: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [bukuPurwacaraka, setBukuPurwacaraka] = useState([]);
    const [namaBuku, setNamaBuku] = useState('');
    const [namaJurusan, setnamaJurusan] = useState('');

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

    const handleSubmit = () => {
        setNamaBuku(bukuPurwacaraka.find(buku => buku.idBukuPurwacaraka === parseInt(formData.bukuPurwacaraka)).namaBuku);
        setnamaJurusan(bukuPurwacaraka.find(buku => buku.idBukuPurwacaraka === parseInt(formData.bukuPurwacaraka)).jurusanKursus.namaJurusan);

        const isFormValid = Object.values(formData).every(value => value !== '');
        if (!isFormValid) {
            alert('Mohon lengkapi semua kolom sebelum mengirimkan data.');
            return;
        } else {
            console.log(formData);
            setShowModal(true);
        }
    };

    return (
        <div className="frame">
            <div class="row">
            <div className="col-sm">
                    <div className="input-field">
                    <label htmlFor="bukuPurwacaraka" className="form-label">Nama Buku</label>
                        <select className="form-select" name="bukuPurwacaraka" onChange={handleChange} defaultValue={1}>
                            {bukuPurwacaraka.map(bukuPurwacaraka => (
                                <option key={bukuPurwacaraka.idBukuPurwacara} value={bukuPurwacaraka.idBukuPurwacara}>{bukuPurwacaraka.namaBuku}</option>
                            ))}
                        </select>
                    </div>
                </div>
            <div className="col-sm">
            </div>
            </div>
            <div class="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Tanggal Beli</label>
                        <input type="date" className="form-control" name="tanggalBeli" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Jumlah Beli</label>
                        <input type="number" className="form-control" name="jumlahBeli" onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div class="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Tanggal Jual</label>
                        <input type="date" className="form-control" name="tanggalJual" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Jumlah Jual</label>
                        <input type="number" className="form-control" name="jumlahJual" onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div class="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Harga Beli</label>
                        <input type="number" className="form-control" name="hargaBeli" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Harga Jual</label>
                        <input type="number"className="form-control" name="hargaJual" onChange={handleChange} />
                    </div>
                </div>
            </div>
            
            <button type="button" className="btn-submit" onClick={handleSubmit}>Submit</button>
            <SummaryModal
                namaBuku={namaBuku}
                namaJurusan={namaJurusan}
                formData={formData}
                show={showModal}
                onHide={() => setShowModal(false)}
                onSuccess={() => {
                    setShowSuccessModal(true);
                }}
            />
            <Berhasil 
                show={showSuccessModal}
                onHide={() => {
                    setShowSuccessModal(false);
                    window.location.reload();
                }}
            />
         </div>
    );
};
