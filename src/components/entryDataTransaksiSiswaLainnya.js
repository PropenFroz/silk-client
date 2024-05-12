import React, { useState, useEffect } from "react";
import '../styles/EntryData.css';
import SummaryModal from './summaryModalEntryDataTransaksiSiswaLainnya';
import Berhasil from './modal';
import { fetchSiswa } from "../service/fetchDataService"; 
import Select from 'react-select'; 
import { NumericFormat } from "react-number-format";

export default function EntryData() { 
    const [formData, setFormData] = useState({
        jenisTransaksi: 3,
        tanggalPembayaran: '',
        siswa: null,
        uangPendaftaran: '',
        uangKursus: '',
        uangBuku: '',
        cash: '',
        transfer: '',
        keterangan: ''
    });

    const [alertPembayaran, setAlertPembayaran] = useState('');
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

    const handleChangeCashTransfer = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        const totalBiaya = (parseInt(formData.uangPendaftaran.replaceAll(/[^\d]/g, ''))) +
            (parseInt(formData.uangKursus.replaceAll(/[^\d]/g, ''))) +
            (parseInt(formData.uangBuku.replaceAll(/[^\d]/g, '')));
    
        if (totalBiaya) {
            setAlertPembayaran(`Total biaya transaksi siswa: Rp${totalBiaya.toLocaleString()}`);
        } else {
            setAlertPembayaran('');
        }
    };

    const handleChange = (selectedOption) => {
        setFormData({
            ...formData,
            siswa: selectedOption ? selectedOption.value : null
        });
        setSelectedSiswa(selectedOption);
    };

    const handleSubmit = () => {
        if (!formData.siswa || !formData.tanggalPembayaran || !formData.uangPendaftaran || !formData.uangKursus || !formData.uangBuku || !formData.cash || !formData.transfer || !formData.keterangan) {
            alert('Mohon lengkapi semua kolom sebelum mengirimkan data.');
            return;
        } else {
            setFormData({
                ...formData,
                uangPendaftaran: parseInt(formData.uangPendaftaran.replaceAll(/[^\d]/g, '')),
                uangKursus: parseInt(formData.uangKursus.replaceAll(/[^\d]/g, '')),
                uangBuku: parseInt(formData.uangBuku.replaceAll(/[^\d]/g, '')),
                cash: parseInt(formData.cash.replaceAll(/[^\d]/g, '')),
                transfer: parseInt(formData.transfer.replaceAll(/[^\d]/g, ''))
            });
            setShowModal(true);
        }
    };

    return (
        <div className="frame">
            <div className="row">
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
                        <NumericFormat className="form-control" name="uangPendaftaran" value={formData.uangPendaftaran} onValueChange={e => setFormData({ ...formData, uangPendaftaran: e.value })} thousandSeparator={true} prefix="Rp" />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Kursus</label>
                        <NumericFormat className="form-control" name="uangKursus" value={formData.uangKursus} onValueChange={e => setFormData({ ...formData, uangKursus: e.value })} thousandSeparator={true} prefix="Rp" />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Uang Buku</label>
                        <NumericFormat className="form-control" name="uangBuku" value={formData.uangBuku} onValueChange={e => setFormData({ ...formData, uangBuku: e.value })} thousandSeparator={true} prefix="Rp" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Cash</label>
                        <NumericFormat className="form-control" name="cash" value={formData.cash} onChange={handleChangeCashTransfer} thousandSeparator={true} prefix="Rp" />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Transfer</label>
                        <NumericFormat className="form-control" name="transfer" value={formData.transfer} onChange={handleChangeCashTransfer} thousandSeparator={true} prefix="Rp" />
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
            <p style={ { color: 'red', fontWeight: '600' } }>{alertPembayaran}</p>
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