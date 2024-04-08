import React, { useState, useEffect } from "react";
import '../styles/EntryData.css';
import SummaryModal from './summaryModalEntryDataTransaksiSiswaKursus';
import Berhasil from './modal';
import { fetchSiswa } from "../service/fetchDataService"; 

export default function EntryData() { 
    const [formData, setFormData] = useState({
        jenisTransaksi: 2,
        tahunKursus: '',
        tanggalPembayaran: '',
        siswa: 1,
        uangPendaftaran: '',
        uangKursus: '',
        uangBuku: '',
        cash: '',
        transfer: '',
        keterangan: ''
    });

    const [selectedSiswa, setSelectedSiswa] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [siswa, setSiswa] = useState([]);

    useEffect(() => {
        fetchSiswa()
            .then(data => {
                setSiswa(data);
            })
            .catch(error => console.error('Error fetching siswa:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = () => {
        setSelectedSiswa(siswa.find(siswa => siswa.idSiswa === parseInt(formData.siswa)).namaSiswa);

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
                        <label className="form-label">Tahun Kursus</label>
                        <input type="number" className="form-control" name="tahunKursus" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Tanggal Pembayaran</label>
                        <input type="date" className="form-control" name="tanggalPembayaran" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label htmlFor="siswa" className="form-label">Siswa</label>
                        <select className="form-select" name="siswa" onChange={handleChange} defaultValue={1}>
                            {siswa.map(siswa => (
                                <option key={siswa.idSiswa} value={siswa.idSiswa}>{siswa.namaSiswa}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                 <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Pendaftaran</label>
                        <input type="number" className="form-control" name="uangPendaftaran" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Kursus</label>
                        <input type="number" className="form-control" name="uangKursus" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Buku</label>
                        <input type="number" className="form-control" name="uangBuku" onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div class="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Cash</label>
                        <input type="number" className="form-control" name="cash" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Transfer</label>
                        <input type="number"className="form-control" name="transfer" onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div class="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Keterangan</label>
                        <input type="text" className="form-control" name="keterangan" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm">
                </div>
            </div>
            <button type="button" className="btn-submit" onClick={handleSubmit}>Submit</button>
            <SummaryModal
                formData={formData}
                selectedSiswa={selectedSiswa}
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
};
