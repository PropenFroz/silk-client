import React, { useState, useEffect } from "react";
import '../styles/EntryData.css';
import SummaryModal from './summaryModalEntryDataTransaksiSiswa';
import Berhasil from './modal';
import { fetchGradeKursus, fetchJurusanKursus } from "../service/fetchDataService"; 

export default function EntryData() { 
    const [formData, setFormData] = useState({
        jenisTransaksi: 1,
        tanggalPembayaran: '',
        namaSiswa: '',
        jurusanKursus: 1,
        gradeKursus: 1,
        uangPendaftaran: '',
        uangKursus: '',
        uangBuku: '',
        cash: '',
        transfer: '',
        keterangan: ''
    });

    const [selectedJurusan, setSelectedJurusan] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [alertPembayaran, setAlertPembayaran] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [gradeKursus, setGradeKursus] = useState([]);
    const [jurusanKursus, setJurusanKursus] = useState([]);

    useEffect(() => {
        fetchGradeKursus()
            .then(data => {
                setGradeKursus(data);
            })
            .catch(error => console.error('Error fetching gradeKursus:', error));

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

        const totalBiaya = (formData.uangPendaftaran !== '' ? parseInt(formData.uangPendaftaran) : 0) +
            (formData.uangKursus !== '' ? parseInt(formData.uangKursus) : 0) +
            (formData.uangBuku !== '' ? parseInt(formData.uangBuku) : 0);
    
        if (totalBiaya) {
            setAlertPembayaran(`Total biaya transaksi siswa: ${totalBiaya}`);
        } else {
            setAlertPembayaran('');
        }
    };
    
    const handleUangPendaftaranChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            uangPendaftaran: value
        });
    };

    const handleUangKursusChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            uangKursus: value
        });
    };

    const handleUangBukuChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            uangBuku: value
        });
    };

    const handleSubmit = () => {
        setSelectedJurusan(jurusanKursus.find(jurusan => jurusan.idJurusanKursus === parseInt(formData.jurusanKursus)).namaJurusan);
        setSelectedGrade(gradeKursus.find(grade => grade.idGradeKursus === parseInt(formData.gradeKursus)).namaGrade);

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
                        <label className="form-label">Tanggal Pembayaran</label>
                        <input type="date" className="form-control" name="tanggalPembayaran" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Nama Siswa</label>
                        <input type="text"  className="form-control" name="namaSiswa" onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div class="row">
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
                 <div className="col-sm">
                    <div className="input-field">
                        <label htmlFor="gradeKursus" className="form-label">Grade</label>
                        <select className="form-select" name="gradeKursus" onChange={handleChange} defaultValue={1}>
                            {gradeKursus.map(grade => (
                                <option key={grade.idGradeKursus} value={grade.idGradeKursus}>{grade.namaGrade}</option>
                            ))}
                        </select>
                    </div>
                 </div>
            </div>
            <div class="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Pendaftaran</label>
                        <input type="number" className="form-control" name="uangPendaftaran" value={formData.uangPendaftaran} onChange={handleUangPendaftaranChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Kursus</label>
                        <input type="number" className="form-control" name="uangKursus" value={formData.uangKursus} onChange={handleUangKursusChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Buku</label>
                        <input type="number" className="form-control" name="uangBuku" value={formData.uangBuku} onChange={handleUangBukuChange} />
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
            <p style={ { color: 'red', fontWeight: '600' } }>{alertPembayaran}</p>
            <button type="button" className="btn-submit" onClick={handleSubmit}>Submit</button>
            <SummaryModal
                formData={formData}
                selectedJurusan={selectedJurusan}
                selectedGrade={selectedGrade}
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