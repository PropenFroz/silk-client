import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from 'react-bootstrap';
import { fetchGradeKursus, fetchJurusanKursus, fetchGuru } from "../service/fetchDataService"; 

export default function EntryDetailGajiGuru() {
    const [gradeKursus, setGradeKursus] = useState([]);
    const [jurusanKursus, setJurusanKursus] = useState([]);
    const [guru, setGuru] = useState([]);
    const [muridList, setMuridList] = useState([]);
    const [selectedGuru, setSelectedGuru] = useState("1");
    const [selectedJurusan, setSelectedJurusan] = useState("1");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
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
        
        fetchGuru()
            .then(data => {
                setGuru(data);
            })
            .catch(error => console.error('Error fetching guru:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "guru") {
            setSelectedGuru(value);
        } else if (name === "jurusanKursus") {
            setSelectedJurusan(value);
        }
    };

    const handleSubmit = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        
        const createEntryGajiGuru = {
            idGuru: parseInt(selectedGuru),
            idJurusanKursus: parseInt(selectedJurusan),
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
            murid: "",
            idGradeKursus: 1,
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
                    [attributeName]: (name.startsWith("idGradeKursus") || name.startsWith("uangKursus") || name.startsWith("feeGuru") || name.startsWith("minggu")) ? parseInt(value) : name.startsWith("tanggal") ? value : value
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
                        <select className="form-select" name="guru" onChange={handleChange} defaultValue={1}>
                            {guru.map(guru => (
                                <option key={guru.idGuru} value={guru.idGuru}>{guru.namaGuru}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="input-field">
                        <label htmlFor="jurusanKursus" className="form-label">Jurusan</label>
                        <select className="form-select" name="jurusanKursus" onChange={handleChange} defaultValue={1}>
                            {jurusanKursus.map(jurusan => (
                                <option key={jurusan.idJurusanKursus} value={jurusan.idJurusanKursus}>{jurusan.namaJurusan}</option>
                            ))}
                        </select>
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
                        <th scope="col">Grade</th>
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
                        <td><input type="text" name={`murid${index + 1}`} onChange={(e) => handleChangeInput(e, index)} /></td>
                        <td>
                            <select name={`idGradeKursus${index + 1}`} onChange={(e) => handleChangeInput(e, index)}>
                                {gradeKursus.map(grade => (
                                    <option key={grade.idGradeKursus} value={grade.idGradeKursus}>{grade.namaGrade}</option>
                                ))}
                            </select>
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