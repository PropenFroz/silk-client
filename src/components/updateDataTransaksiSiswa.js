import React, { useState, useEffect } from "react";
import '../styles/EntryData.css';
import { useHistory } from 'react-router-dom';
import SummaryModal from './summaryModalUpdateDataTransaksiSiswa';
import Berhasil from './modalSuccessUpdate';
import { fetchSiswa, fetchEntryDataById } from "../service/fetchDataService";

export default function UpdateData({ id }) {
    const [formData, setFormData] = useState({
        tahunKursus: 1,
        tanggalPembayaran: '',
        siswa: '',
        uangPendaftaran: '',
        uangKursus: '',
        uangBuku: '',
        cash: '',
        transfer: '',
        keterangan: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [siswa, setSiswa] = useState([]);
    const [selectedSiswa, setSelectedSiswa] = useState('');
    const [selectedTahunKursus, setSelectedTahunKursus] = useState(''); // Tambah state untuk menyimpan tahun kursus yang dipilih
    const history = useHistory();

    useEffect(() => {
        fetchSiswa()
            .then(data => {
                setSiswa(data);
                if (data.length > 0) {
                    const firstSiswa = data[0];
                    const tahunKursusKeys = Object.keys(firstSiswa.tanggalKursusPerTahun);
                    setSelectedTahunKursus(tahunKursusKeys[0]); // Set tahun kursus yang dipilih ke tahun pertama
                }
            })
            .catch(error => console.error('Error fetching siswa:', error));
    
        fetchEntryDataById(id)
            .then(data => {
                const formattedDate = new Date(data.tanggalPembayaran).toISOString().split('T')[0];
                const updatedData = { ...data, tanggalPembayaran: formattedDate };
                setFormData(updatedData);
            })
            .catch(error => console.error('Error fetching existing transaction data:', error));
    }, [id]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tahunKursus') {
            setSelectedTahunKursus(value); // Perbarui tahun kursus yang dipilih
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        setSelectedSiswa(siswa.find(siswa => siswa.idSiswa === parseInt(formData.siswa.idSiswa)).namaSiswa);

        const isFormValid = Object.values(formData).every(value => value !== '');
        if (!isFormValid) {
            alert('Mohon lengkapi semua kolom sebelum mengirimkan data.');
            return;
        } else {
            const updatedFormData = { 
                ...formData,
                tahunKursus: selectedTahunKursus, // Gunakan tahun kursus yang dipilih
                tanggalPembayaran: new Date(formData.tanggalPembayaran).toISOString(),
                siswa: formData.siswa.idSiswa,
                uangPendaftaran: formData.uangPendaftaran.toString(),
                uangKursus: formData.uangKursus.toString(),
                uangBuku: formData.uangBuku.toString(),
                cash: formData.cash.toString(),
                transfer: formData.transfer.toString(),
                keterangan: formData.keterangan,
            };
            console.log(updatedFormData)
            setFormData(updatedFormData);
            setShowModal(true);
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        history.push("/laporan-transaksi-siswa");
    };

    const getTahunKursusOptions = () => {
        if (formData.siswa && formData.siswa.tanggalKursusPerTahun) {
            const tahunKursusKeys = Object.keys(formData.siswa.tanggalKursusPerTahun);
            return tahunKursusKeys.map(tahun => (
                <option key={tahun} value={tahun}>{tahun}</option>
            ));
        } else {
            return null;
        }
    };

    return (
        <div className="frame">
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Jenis Pembayaran: {formData.jenisTransaksi === 1 ? "Pendaftaran" : formData.jenisTransaksi === 2 ? "Kursus" : "Lainnya"}</label>
                    </div>
                </div>
                <div className="col-sm">
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Tahun Kursus</label>
                        <select className="form-select" name="tahunKursus" onChange={handleChange} value={selectedTahunKursus} defaultValue={1} disabled={formData.jenisTransaksi !== 2}>
                            {getTahunKursusOptions()}
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Tanggal Pembayaran</label>
                        <input type="date" className="form-control" name="tanggalPembayaran" onChange={handleChange} value={formData.tanggalPembayaran} />
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

            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Pendaftaran</label>
                        <input type="number" className="form-control" name="uangPendaftaran" onChange={handleChange} value={formData.uangPendaftaran} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Kursus</label>
                        <input type="number" className="form-control" name="uangKursus" onChange={handleChange} value={formData.uangKursus} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Buku</label>
                        <input type="number" className="form-control" name="uangBuku" onChange={handleChange} value={formData.uangBuku} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Cash</label>
                        <input type="number" className="form-control" name="cash" onChange={handleChange} value={formData.cash} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Transfer</label>
                        <input type="number" className="form-control" name="transfer" onChange={handleChange} value={formData.transfer} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Keterangan</label>
                        <input type="text" className="form-control" name="keterangan" onChange={handleChange} value={formData.keterangan} />
                    </div>
                </div>
                <div className="col-sm">
                </div>
            </div>

            <button type="button" className="btn-submit" onClick={handleSubmit}>Submit</button>

            <SummaryModal
                id={id} 
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
                onHide={handleSuccessModalClose}
            />
        </div>
    );
};
