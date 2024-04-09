import React, { useState, useEffect } from "react";
import Select from 'react-select';
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
    const [siswaOptions, setSiswaOptions] = useState([]);
    const [selectedSiswa, setSelectedSiswa] = useState('');
    const [selectedTahunKursus, setSelectedTahunKursus] = useState('');
    const history = useHistory();

    useEffect(() => {
        fetchSiswa()
            .then(data => {
                setSiswaOptions(data.map(siswa => ({
                    value: siswa.idSiswa,
                    label: siswa.namaSiswa
                })));
                if (data.length > 0) {
                    const firstSiswa = data[0];
                    const tahunKursusKeys = Object.keys(firstSiswa.tanggalKursusPerTahun);
                    setSelectedTahunKursus(tahunKursusKeys[0]);
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
    

    const handleChange = (name, value) => {
        if (name === 'tahunKursus') {
            setSelectedTahunKursus(value);
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        setSelectedSiswa(siswaOptions.find(option => option.value === formData.siswa.idSiswa).label);

        const isFormValid = Object.values(formData).every(value => value !== '');
        if (!isFormValid) {
            alert('Mohon lengkapi semua kolom sebelum mengirimkan data.');
            return;
        } else {
            const updatedFormData = { 
                ...formData,
                tahunKursus: selectedTahunKursus,
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
                        <select className="form-select" name="tahunKursus" onChange={e => handleChange(e.target.name, e.target.value)} value={selectedTahunKursus} defaultValue={1} disabled={formData.jenisTransaksi !== 2}>
                            {getTahunKursusOptions()}
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Tanggal Pembayaran</label>
                        <input type="date" className="form-control" name="tanggalPembayaran" onChange={e => handleChange(e.target.name, e.target.value)} value={formData.tanggalPembayaran} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label htmlFor="siswa" className="form-label">Siswa</label>
                        <Select
                            options={siswaOptions}
                            onChange={option => handleChange("siswa", option.value)}
                            value={siswaOptions.find(option => option.value === formData.siswa.idSiswa)}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Pendaftaran</label>
                        <input type="number" className="form-control" name="uangPendaftaran" onChange={e => handleChange(e.target.name, e.target.value)} value={formData.uangPendaftaran} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Kursus</label>
                        <input type="number" className="form-control" name="uangKursus" onChange={e => handleChange(e.target.name, e.target.value)} value={formData.uangKursus} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Buku</label>
                        <input type="number" className="form-control" name="uangBuku" onChange={e => handleChange(e.target.name, e.target.value)} value={formData.uangBuku} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Cash</label>
                        <input type="number" className="form-control" name="cash" onChange={e => handleChange(e.target.name, e.target.value)} value={formData.cash} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Transfer</label>
                        <input type="number" className="form-control" name="transfer" onChange={e => handleChange(e.target.name, e.target.value)} value={formData.transfer} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Keterangan</label>
                        <input type="text" className="form-control" name="keterangan" onChange={e => handleChange(e.target.name, e.target.value)} value={formData.keterangan} />
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
