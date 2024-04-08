import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from 'react-bootstrap';
import { fetchSiswa, fetchJurusanKursus, fetchGuru } from "../service/fetchDataService";
import Select from 'react-select'; 

export default function EntryDetailGajiGuru() {
    const [siswa, setSiswa] = useState([]);
    const [jurusanKursus, setJurusanKursus] = useState([]);
    const [guru, setGuru] = useState([]);
    const [muridList, setMuridList] = useState([]);
    const [selectedGuru, setSelectedGuru] = useState(null);
    const [selectedJurusan, setSelectedJurusan] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        
        const createEntryGajiGuru = {
            idGuru: parseInt(selectedGuru.value),
            idJurusanKursus: parseInt(selectedJurusan.value),
            listCreateEntryGajiGuruDetailRequestDTO: muridList
        };
    
        fetch('http://localhost:8080/api/entry-gaji-guru', {
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
            feeGuru: 0,
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
                return {
                    ...murid,
                    [attributeName]: (name.startsWith("siswa") || name.startsWith("uangKursus") || name.startsWith("feeGuru") || name.startsWith("minggu")) ? parseInt(value) : name.startsWith("tanggal") ? value : value
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
                    <Button className="btn-submit" style={{fontSize: '12px'}} onClick={handleTambahMurid}>+ Tambah Murid</Button>
                </div>
                <div className="col-sm"></div>
            </div>

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
                        <th scope="col">Fee Guru (40%)</th>
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
                        <td><input type="number" name={`uangKursus${index + 1}`} onChange={(e) => handleChangeInput(e, index)} /></td>
                        <td><input type="date" name={`tanggal${index + 1}`} onChange={(e) => handleChangeInput(e, index)} /></td> {/* Input tanggal */}
                        <td><input type="number" name={`minggu1${index + 1}`} onChange={(e) => handleChangeInput(e, index)} /></td>
                        <td><input type="number" name={`minggu2${index + 1}`} onChange={(e) => handleChangeInput(e, index)} /></td>
                        <td><input type="number" name={`minggu3${index + 1}`} onChange={(e) => handleChangeInput(e, index)} /></td>
                        <td><input type="number" name={`minggu4${index + 1}`} onChange={(e) => handleChangeInput(e, index)} /></td>
                        <td><input type="number" name={`feeGuru${index + 1}`} onChange={(e) => handleChangeInput(e, index)} /></td>
                        <td><input type="text" name={`keterangan${index + 1}`} onChange={(e) => handleChangeInput(e, index)} /></td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <div className="row mt-5">
                <div className="col-sm">
                    <Button className="btn-submit" onClick={handleSubmit}>Submit</Button>
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