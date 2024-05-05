import React, { useState, useEffect } from 'react';
import '../styles/EntryData.css';
import {fetchJurusanKursus } from "../service/fetchDataService"; 
import SummaryModal from './summaryModalEntryDataTambahBuku';
import Berhasil from './modal';

export default function EntryTambahBukuComponent() {
    const [formData, setFormData] = useState({
        namaBuku: '',
        jurusanKursus: 1,
        stokBuku: 0
    });

    const [selectedJurusan, setSelectedJurusan] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [jurusanKursus, setJurusanKursus] = useState([]);

    useEffect(() => {
        fetchJurusanKursus()
            .then(data => {
                setJurusanKursus(data);
            })
            .catch(error => console.error('Error fetching jurusanKursus:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = () => {
        setSelectedJurusan(jurusanKursus.find(jurusan => jurusan.idJurusanKursus === parseInt(formData.jurusanKursus)).namaJurusan);

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
                        <label className="form-label" >Nama Buku:</label>
                        <input name="namaBuku" className="form-control" type="text" onChange={(handleChange)} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                    <label htmlFor="jurusanKursus" className="form-label">Jurusan</label>
                        <select className="form-select" name="jurusanKursus" onChange={handleChange} defaultValue={1}>
                            {jurusanKursus.map(jurusan => (
                                <option key={jurusan.idJurusanKursus} value={jurusan.idJurusanKursus}>{jurusan.namaJurusan}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div className="col-sm">
                    <div className="input-field">
                        <input name="stokBuku" className="form-control" type="number" onChange={(handleChange)} hidden />
                    </div>
                </div>
            </div>
                <button className="btn-submit" type="submit" onClick={handleSubmit} >Tambah Buku</button>
                <SummaryModal
                formData={formData}
                selectedJurusan={selectedJurusan}
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
                        window.location.reload()
                    }}
                />
        </div>
    );
}
