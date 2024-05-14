import React, { useState, useEffect } from "react";
import '../styles/EntryData.css';
import SummaryModal from './summaryModalEntryPembelianBuku';
import Berhasil from './modal';
import { fetchBukuPurwacaraka } from "../service/fetchDataService"; 
import Select from 'react-select'; 
import { NumericFormat } from "react-number-format";

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
    const [selectedBuku, setSelectedBuku] = useState(null);
    const [namaBuku, setNamaBuku] = useState('');
    const [namaJurusan, setnamaJurusan] = useState('');
    const [stokBuku, setStokBuku] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchBukuPurwacaraka()
            .then(data => {
                const options = data.map(buku => ({
                    value: buku.idBukuPurwacaraka,
                    label: buku.namaBuku,
                    jurusan: buku.jurusanKursus.namaJurusan,
                    jumlah: buku.jumlah
                }));
                setBukuPurwacaraka(options);
            })
            .catch(error => console.error('Error fetching bukuPurwacaraka:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'jumlahJual') {
            if (parseInt(value) > stokBuku) {
                setErrorMessage('Stok buku tidak mencukupi penjualan');
            } else {
                setErrorMessage('');
            }
        }
    };

    const handleBookChange = (selectedOption) => {
        setFormData({
            ...formData,
            bukuPurwacaraka: selectedOption ? selectedOption.value : null
        });
        setSelectedBuku(selectedOption);
        setStokBuku(selectedOption ? selectedOption.jumlah : 0);
        setErrorMessage('');
    };

    const handleSubmit = () => {
        setNamaBuku(selectedBuku.label);
        setnamaJurusan(selectedBuku.jurusan);

        const isFormValid = Object.values(formData).every(value => value !== '');
        if (!isFormValid) {
            alert('Mohon lengkapi semua kolom sebelum mengirimkan data.');
            return; 
        } else {
            setFormData({
                ...formData,
                hargaBeli: parseInt(formData.hargaBeli.replaceAll(/[^\d]/g, '')),
                hargaJual: parseInt(formData.hargaJual.replaceAll(/[^\d]/g, ''))
            });

            if (parseInt(formData.jumlahJual) > stokBuku) {
                alert('Stok buku tidak mencukupi penjualan.');
                return;
            }

            setShowModal(true);
        }
    };

    return (
        <div className="frame">
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label htmlFor="bukuPurwacaraka" className="form-label">Nama Buku</label>
                        <Select
                            options={bukuPurwacaraka}
                            value={selectedBuku}
                            onChange={handleBookChange}
                            placeholder="Pilih Buku"
                        /> 
                    </div>
                </div>
                <div className="col-sm">
                </div>
            </div>
            <div className="row">
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
            <div className="row">
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
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Harga Beli</label>
                        <NumericFormat name="hargaBeli" onChange={handleChange} thousandSeparator={true} prefix="Rp" />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Harga Jual</label>
                        <NumericFormat name="hargaJual" onChange={handleChange} thousandSeparator={true} prefix="Rp"/>
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
