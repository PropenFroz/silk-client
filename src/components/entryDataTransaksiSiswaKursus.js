import React, { useState, useEffect } from "react";
import '../styles/EntryData.css';
import SummaryModal from './summaryModalEntryDataTransaksiSiswaKursus';
import Berhasil from './modal';
import { fetchSiswa } from "../service/fetchDataService"; 
import Select from 'react-select'; 

export default function EntryData() { 
    const [formData, setFormData] = useState({
        jenisTransaksi: 2,
        tahunKursus: '',
        tanggalPembayaran: '',
        siswa: null,
        uangPendaftaran: '',
        uangKursus: '',
        uangBuku: '',
        cash: '',
        transfer: '',
        keterangan: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [siswaOptions, setSiswaOptions] = useState([]);
    const [selectedSiswa, setSelectedSiswa] = useState(null);

    useEffect(() => {
        fetchSiswa()
            .then(data => {
                const options = data.map(siswa => ({ value: siswa.idSiswa, label: siswa.namaSiswa }));
                setSiswaOptions(options);
            })
            .catch(error => console.error('Error fetching siswa:', error));
    }, []);

    const handleChange = (selectedOption) => {
        setFormData({
            ...formData,
            siswa: selectedOption ? selectedOption.value : null
        });
        setSelectedSiswa(selectedOption);
    };

    const handleSubmit = () => {
        if (!formData.siswa || !formData.tahunKursus || !formData.tanggalPembayaran || !formData.uangPendaftaran || !formData.uangKursus || !formData.uangBuku || !formData.cash || !formData.transfer || !formData.keterangan) {
            alert('Mohon lengkapi semua kolom sebelum mengirimkan data.');
            return;
        } else {
            setShowModal(true);
        }
    };

    return (
        <div className="frame">
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Tahun Kursus</label>
                        <input type="number" className="form-control" name="tahunKursus" onChange={e => setFormData({ ...formData, tahunKursus: e.target.value })} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Tanggal Pembayaran</label>
                        <input type="date" className="form-control" name="tanggalPembayaran" onChange={e => setFormData({ ...formData, tanggalPembayaran: e.target.value })} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label htmlFor="siswa" className="form-label">Siswa</label>
                        <Select
                            options={siswaOptions}
                            value={selectedSiswa}
                            onChange={handleChange}
                            placeholder="Pilih Siswa"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Pendaftaran</label>
                        <input type="number" className="form-control" name="uangPendaftaran" onChange={e => setFormData({ ...formData, uangPendaftaran: e.target.value })} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Kursus</label>
                        <input type="number" className="form-control" name="uangKursus" onChange={e => setFormData({ ...formData, uangKursus: e.target.value })} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Buku</label>
                        <input type="number" className="form-control" name="uangBuku" onChange={e => setFormData({ ...formData, uangBuku: e.target.value })} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Cash</label>
                        <input type="number" className="form-control" name="cash" onChange={e => setFormData({ ...formData, cash: e.target.value })} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Transfer</label>
                        <input type="number" className="form-control" name="transfer" onChange={e => setFormData({ ...formData, transfer: e.target.value })} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Keterangan</label>
                        <input type="text" className="form-control" name="keterangan" onChange={e => setFormData({ ...formData, keterangan: e.target.value })} />
                    </div>
                </div>
                <div className="col-sm">
                </div>
            </div>
            <button type="button" className="btn-submit" onClick={handleSubmit}>Submit</button>
            <SummaryModal
                formData={formData}
                selectedSiswa={selectedSiswa ? selectedSiswa.label : ''}
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