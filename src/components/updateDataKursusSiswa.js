import React, { useState, useEffect } from "react";
import Select from 'react-select';
import '../styles/EntryData.css';
import { useHistory } from 'react-router-dom';
import SummaryModal from './summaryModalUpdateKursusSiswa';
import Berhasil from './modalSuccessUpdate';
import { fetchSiswa, fetchEntryDataById, fetchIuranSiswaById } from "../service/fetchDataService";

export default function UpdateData({ id }) {
    const [formData, setFormData] = useState({
        tahunKursus: '',
        bulanKursus: '',
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
    const [selectedMonth, setSelectedMonth] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetchSiswa()
            .then(data => {
                const options = data.map(siswa => ({ value: siswa.idSiswa, label: siswa.namaSiswa }));
                setSiswaOptions(options);
            })
            .catch(error => console.error('Error fetching siswa:', error));

        fetchIuranSiswaById(id)
            .then(data => {
                const dataBulan = data.bulan;
                const dataTahun = data.tahun;
                setFormData(prevFormData => ({
                    ...prevFormData,
                    bulanKursus: dataBulan,
                    tahunKursus: dataTahun
                }));
            })
            .catch(error => console.error('Error fetching existing transaction data:', error));

        fetchEntryDataById(id)
            .then(data => {
                const formattedDate = new Date(data.tanggalPembayaran).toISOString().split('T')[0];
                const updatedData = { ...data, tanggalPembayaran: formattedDate };
                setFormData(updatedData);
            })
            .catch(error => console.error('Error fetching existing transaction data:', error));
    }, [id]);
    

    const handleChange = (name, value) => {
        if (name === 'siswa') {
            setSelectedSiswa(value);
        } else if (name === 'bulanKursus') {
            setSelectedMonth(value);
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        const selectedSiswaName = setSelectedSiswa(siswaOptions.find(option => option.value === formData.siswa.idSiswa).label);

        const selectedMonthValue = formData.bulanKursus || selectedMonth;

        const isFormValid = Object.values(formData).every(value => value !== '');
        if (!isFormValid) {
            alert('Mohon lengkapi semua kolom sebelum mengirimkan data.');
            return;
        } else {
            const updatedFormData = { 
                ...formData,
                tanggalPembayaran: new Date(formData.tanggalPembayaran).toISOString(),
                siswa: formData.siswa.idSiswa,
                uangPendaftaran: formData.uangPendaftaran.toString(),
                uangKursus: formData.uangKursus.toString(),
                uangBuku: formData.uangBuku.toString(),
                cash: formData.cash.toString(),
                transfer: formData.transfer.toString(),
                keterangan: formData.keterangan,
            };
            console.log('Form submitted:', updatedFormData);
            setFormData(updatedFormData);
            setShowModal(true);
            setSelectedSiswa(selectedSiswaName);
            setSelectedMonth(selectedMonthValue); 
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        history.push("/laporan-transaksi-siswa");
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
                        <label className="form-label">Jenis Pembayaran: Kursus</label>
                    </div>
                </div>
                <div className="col-sm">
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Tahun Kursus</label>
                        <input type="number" className="form-control" name="tahunKursus" onChange={e => handleChange(e.target.name, e.target.value)} value={formData.tahunKursus} />
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
                            isDisabled={true}
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
                        <label className="form-label">Bulan Kursus</label>
                        <Select
                            options={monthOptions}
                            value={monthOptions.find(option => option.value === formData.bulanKursus)}
                            onChange= {option => handleChange("bulanKursus", option.value)}
                        />
                    </div>
                </div>
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
