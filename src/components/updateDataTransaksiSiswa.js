import React, { useState, useEffect } from "react";
import '../styles/EntryData.css';
import SummaryModal from './summaryModalUpdateDataTransaksiSiswa';
import Berhasil from './modalSuccessUpdate';
import { fetchGradeKursus, fetchJurusanKursus, fetchEntryDataById} from "../service/fetchDataService";
import updateEntryData from "../service/updateDataTransaksiSiswaService";

export default function UpdateData({ id }) { 
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

    const [gradeKursus, setGradeKursus] = useState([]);
    const [jurusanKursus, setJurusanKursus] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedJurusan, setSelectedJurusan] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');

    useEffect(() => {
        // Fetch data for dropdown options
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

        // Fetch existing transaction data by ID and populate form fields
        fetchEntryDataById(id)
            .then(data => {
                setFormData(data);
            })
            .catch(error => console.error('Error fetching existing transaction data:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        setSelectedJurusan(jurusanKursus.find(jurusan => jurusan.idJurusanKursus === parseInt(formData.jurusanKursus.idJurusanKursus)).namaJurusan);
        setSelectedGrade(gradeKursus.find(grade => grade.idGradeKursus === parseInt(formData.gradeKursus.idGradeKursus)).namaGrade);

        const isFormValid = Object.values(formData).every(value => value !== '');
        if (!isFormValid) {
            alert('Mohon lengkapi semua kolom sebelum mengirimkan data.');
            return;
        } else {
            console.log(formData);
            const updatedFormData = { ...formData };

            delete updatedFormData.gradeKursus;
            delete updatedFormData.jurusanKursus;


            updatedFormData.tanggalPembayaran = new Date(formData.tanggalPembayaran).toISOString()
            updatedFormData.gradeKursus = formData.gradeKursus.idGradeKursus;
            updatedFormData.jurusanKursus = formData.jurusanKursus.idJurusanKursus;
            updatedFormData.transfer = formData.transfer.toString();
            updatedFormData.uangBuku = formData.uangBuku.toString();
            updatedFormData.uangKursus = formData.uangKursus.toString();
            updatedFormData.uangPendaftaran = formData.uangPendaftaran.toString();
            updatedFormData.cash = formData.cash.toString();

            console.log(updatedFormData);
            setFormData(updatedFormData);
            setShowModal(true);
        }

            // updateEntryData(id, updatedFormData)
            // .then(() => {
            //     setShowModal(true);
            // })
            // .catch(error => console.error('Error updating entry data:', error));
    };

    return (
        <div className="frame">
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label htmlFor="jenisTransaksi" className="form-label">Jenis Pembayaran</label>
                        <select className="form-select" name="jenisTransaksi" onChange={handleChange} value={formData.jenisTransaksi}>
                            <option value={1}>Pendaftaran</option>
                            <option value={2}>Kursus</option>
                            <option value={3}>Lainnya</option>
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                </div>  
            </div>

            <div className="row">
                <div className="col-sm">
                        <div className="input-field">
                            <label className="form-label">Tanggal Pembayaran</label>
                            <input type="date" className="form-control" name="tanggalPembayaran" onChange={handleChange} value={formData.tanggalPembayaran}/>
                        </div>
                    </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label className="form-label">Nama Siswa</label>
                        <input type="text" className="form-control" name="namaSiswa" onChange={handleChange} value={formData.namaSiswa} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label htmlFor="jurusanKursus" className="form-label">Jurusan</label>
                        <select className="form-select" name="jurusanKursus" onChange={handleChange} value={formData.jurusanKursus}>
                            {jurusanKursus.map(jurusan => (
                                <option key={jurusan.idJurusanKursus} value={jurusan.idJurusanKursus}>{jurusan.namaJurusan}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label htmlFor="gradeKursus" className="form-label">Grade</label>
                        <select className="form-select" name="gradeKursus" onChange={handleChange} value={formData.gradeKursus}>
                            {gradeKursus.map(grade => (
                                <option key={grade.idGradeKursus} value={grade.idGradeKursus}>{grade.namaGrade}</option>
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