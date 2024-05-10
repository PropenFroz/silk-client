import React, { useState, useEffect } from "react";
import '../styles/EntryData.css';
import SummaryModal from './summaryModalEntryDataTransaksiSiswaKursus';
import Berhasil from './modal';
import { fetchSiswa } from "../service/fetchDataService"; 
import Select from 'react-select'; 

export default function EntryData() { 
    const [formData, setFormData] = useState({
        jenisTransaksi: 2,
        bulanKursus: '',
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

    const [alertPembayaran, setAlertPembayaran] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [siswaOptions, setSiswaOptions] = useState([]);
    const [selectedSiswa, setSelectedSiswa] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

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

        const totalBiaya = (formData.uangPendaftaran !== '' ? parseInt(formData.uangPendaftaran) : 0) +
        (formData.uangKursus !== '' ? parseInt(formData.uangKursus) : 0) +
        (formData.uangBuku !== '' ? parseInt(formData.uangBuku) : 0);

        if (totalBiaya) {
            setAlertPembayaran(`Total biaya transaksi siswa: ${totalBiaya}`);
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

    const handleMonthChange = (selectedOption) => {
        setFormData({
            ...formData,
            bulanKursus: selectedOption ? selectedOption.value : null
        });
        setSelectedMonth(selectedOption);
    };

    const handleSubmit = () => {
        if (!formData.siswa || !formData.tahunKursus || !formData.tanggalPembayaran || !formData.uangPendaftaran || !formData.uangKursus || !formData.uangBuku || !formData.cash || !formData.transfer || !formData.keterangan || !formData.bulanKursus) {
            alert('Mohon lengkapi semua kolom sebelum mengirimkan data.');
            return;
        } else {
            setShowModal(true);
        }
    };

    const monthOptions = [
        { value: 1, label: 'Januari' },
        { value: 2, label: 'Februari' },
        { value: 3, label: 'Maret' },
        { value: 4, label: 'April' },
        { value: 5, label: 'Mei' },
        { value: 6, label: 'Juni' },
        { value: 7, label: 'Juli' },
        { value: 8, label: 'Agustus' },
        { value: 9, label: 'September' },
        { value: 10, label: 'Oktober' },
        { value: 11, label: 'November' },
        { value: 12, label: 'Desember' }
    ];

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
                        <input type="number" className="form-control" name="cash" onChange={handleChangeCashTransfer} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Transfer</label>
                        <input type="number" className="form-control" name="transfer" onChange={handleChangeCashTransfer} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Bulan Kursus</label>
                        <Select
                            options={monthOptions}
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            placeholder="Pilih Bulan"
                        />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Keterangan</label>
                        <input type="text" className="form-control" name="keterangan" onChange={e => setFormData({ ...formData, keterangan: e.target.value })} />
                    </div>
                </div>
            </div>
            <p style={ { color: 'red', fontWeight: '600' } }>{alertPembayaran}</p>
            <button type="button" className="btn-submit" onClick={handleSubmit}>Submit</button>
            <SummaryModal
                formData={formData}
                selectedSiswa={selectedSiswa ? selectedSiswa.label : ''}
                selectedMonth={selectedMonth ? selectedMonth.label : ''}
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