import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from 'react-bootstrap';
import { fetchSiswa, fetchJurusanKursus, fetchGuru } from "../service/fetchDataService";
import Select from 'react-select'; 
import '../styles/EntryData.css';
import { config } from "../Constants"
import { NumericFormat } from "react-number-format";

export default function EntryDetailGajiGuru() {
    const [siswa, setSiswa] = useState([]);
    const [jurusanKursus, setJurusanKursus] = useState([]);
    const [guru, setGuru] = useState([]);
    const [muridList, setMuridList] = useState([]);
    const [selectedGuru, setSelectedGuru] = useState(null);
    const [selectedJurusan, setSelectedJurusan] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = config.url.API_BASE_URL + '/api/';

    useEffect(() => {
        fetchSiswa()
            .then(data => {
                setSiswa(data.map(siswa => ({ value: siswa.idSiswa, label: siswa.namaSiswa })));
            })
            .catch(error => console.error('Error fetching siswa:', error));

        fetchJurusanKursus()
            .then(data => {
                setJurusanKursus(data.map(jurusan => ({ value: jurusan.idJurusanKursus, label: jurusan.namaJurusan })));
            })
            .catch(error => console.error('Error fetching jurusanKursus:', error));
        
        fetchGuru()
            .then(data => {
                setGuru(data.map(guru => ({ value: guru.idGuru, label: guru.namaGuru })));
            })
            .catch(error => console.error('Error fetching guru:', error));
    }, []);

    const handleSubmit = () => {
        if (!selectedGuru || !selectedJurusan) {
            setError("Mohon lengkapi data guru dan jurusan.");
            return;
        }

        if (muridList.some(murid => !murid.siswa || !murid.uangKursus || !murid.tanggal || !murid.minggu1 || !murid.minggu2 || !murid.minggu3 || !murid.minggu4 || !murid.keterangan)) {
            setError("Mohon lengkapi semua field pada tabel.");
            return;
        }

        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        
        const createEntryGajiGuru = {
            idGuru: parseInt(selectedGuru.value),
            idJurusanKursus: parseInt(selectedJurusan.value),
            listCreateEntryGajiGuruDetailRequestDTO: muridList
        };
    
        fetch(`${baseUrl}entry-gaji-guru`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createEntryGajiGuru),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
            console.log('Data submitted successfully');
            setMuridList([]);
            setError(null);
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
    };

    const handleTambahMurid = () => {
        const newMurid = {
            siswa: 1,
            uangKursus: 0,
            minggu1: 0,
            minggu2: 0,
            minggu3: 0,
            minggu4: 0,
            keterangan: "",
            tanggal: ""
        };
        setMuridList([...muridList, newMurid]);
    };

    const handleChangeInput = (e, index) => {
        const { name, value } = e.target;
        const attributeName = name.substring(0, name.length - 1);
        const updatedMuridList = muridList.map((murid, i) => {
            if (index === i) {
                let feeGuru = 0;
                if (attributeName.startsWith("uangKursus")) {
                    const uangKursus = parseInt(value);
                    if (!isNaN(uangKursus)) {
                        feeGuru = uangKursus * 0.4;
                    }
                }
                return {
                    ...murid,
                    [attributeName]: attributeName.startsWith("uangKursus") ? parseInt(value) : name.startsWith("tanggal") ? value : value,
                    feeGuru: attributeName.startsWith("uangKursus") ? feeGuru : murid.feeGuru
                };
            }
            return murid;
        });
        setMuridList(updatedMuridList);
    };

    return (
        <div className="mt-4">
            <div className="row">
                <div className="col-sm">
                    <div className="input-field">
                        <label htmlFor="guru" className="form-label">Nama Guru</label>
                        <Select
                            options={guru}
                            value={selectedGuru}
                            onChange={setSelectedGuru}
                            placeholder="Pilih Guru"
                        />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label htmlFor="jurusanKursus" className="form-label">Jurusan</label>
                        <Select
                            options={jurusanKursus}
                            value={selectedJurusan}
                            onChange={setSelectedJurusan}
                            placeholder="Pilih Jurusan"
                        />
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm">
                    <button type="button" className="btn-submit" onClick={handleTambahMurid}>+Tambah Murid</button>
                </div>
                <div className="col-sm"></div>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <Table responsive bordered className="mt-4">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Siswa</th>
                        <th scope="col">Uang Kursus</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Minggu 1</th>
                        <th scope="col">Minggu 2</th>
                        <th scope="col">Minggu 3</th>
                        <th scope="col">Minggu 4</th>
                        <th scope="col">Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                {muridList.map((murid,index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>
                            <Select
                                options={siswa}
                                onChange={(selectedOption) => {
                                    const updatedMuridList = muridList.map((murid, i) => {
                                        if (index === i) {
                                            return {
                                                ...murid,
                                                siswa: parseInt(selectedOption.value)
                                            };
                                        }
                                        return murid;
                                    });
                                    setMuridList(updatedMuridList);
                                }}
                                placeholder="Pilih Siswa"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        width: '100%',
                                        minWidth: '200px',
                                    })
                                }}
                            />
                        </td>
                        <td>
                            <NumericFormat
                                value={murid[`uangKursus${index + 1}`]}
                                thousandSeparator={true}
                                prefix={'Rp'}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    handleChangeInput({ target: { name: `uangKursus${index + 1}`, value } }, index);
                                }}
                            />
                        </td>
                        <td><input type="date" name={`tanggal${index + 1}`} onChange={(e) => handleChangeInput(e, index)} /></td>
                        <td>
                            <NumericFormat
                                value={murid[`minggu1${index + 1}`]}
                                thousandSeparator={true}
                                prefix={'Rp'}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    handleChangeInput({ target: { name: `minggu1${index + 1}`, value } }, index);
                                }}
                            />
                        </td>
                        <td>
                            <NumericFormat
                                value={murid[`minggu2${index + 1}`]}
                                thousandSeparator={true}
                                prefix={'Rp'}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    handleChangeInput({ target: { name: `minggu2${index + 1}`, value } }, index);
                                }}
                            />
                        </td>
                        <td>
                            <NumericFormat
                                value={murid[`minggu3${index + 1}`]}
                                thousandSeparator={true}
                                prefix={'Rp'}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    handleChangeInput({ target: { name: `minggu3${index + 1}`, value } }, index);
                                }}
                            />
                        </td>
                        <td>
                            <NumericFormat
                                value={murid[`minggu4${index + 1}`]}
                                thousandSeparator={true}
                                prefix={'Rp'}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    handleChangeInput({ target: { name: `minggu4${index + 1}`, value } }, index);
                                }}
                            />
                        </td>
                        <td><input type="text" name={`keterangan${index + 1}`} onChange={(e) => handleChangeInput(e, index)} /></td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <div className="row mt-5">
                <div className="col-sm">
                    <button type="button" className="btn-submit" onClick={handleSubmit}>Submit</button>
                </div>
                <div className="col-sm"></div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Informasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>Harap cek kembali tabel.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Tutup</Button>
                    <Button variant="primary" onClick={handleCloseModal}>Submit</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}