import React from 'react';
import { Table, DropdownButton, Dropdown } from 'react-bootstrap';
import '../styles/tableLaporan.css';
import '../styles/statusSiswa.css';

export default function TableLaporanSiswaEksekutif({ transactions }) {
    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return "Baru";
            case 2:
                return "Cuti";
            case 3:
                return "Cuti masuk kembali";
            case 4:
                return "Off";
            default:
                return "";
        }
    };

    const getButtonVariant = (status) => {
        switch (status) {
            case 1:
                return "primary";
            case 2:
                return "danger";
            case 3:
                return "warning";
            case 4:
                return "secondary";
            default:
                return "secondary";
        }
    };
    
    if (!transactions) {
        return <div>Mohon Pilih Tanggal Terlebih Dahulu!</div>;
    }

    if (transactions.length === 0) {
        return <div>Data Tidak Ditemukan</div>;
    }

    return (
        <div className="table-wrapper">
            <Table responsive bordered>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Jurusan</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{transaction.namaSiswa}</td>
                            <td>{transaction.jurusanKursus.namaJurusan}</td>
                            <td>{transaction.gradeKursus.namaGrade}</td>
                            <td>
                            <DropdownButton
                                title={getStatusText(transaction.status)}
                                variant={getButtonVariant(transaction.status)}
                                disabled
                            >
                                <Dropdown.Item eventKey={1}>Baru</Dropdown.Item>
                                <Dropdown.Item eventKey={2}>Cuti</Dropdown.Item>
                                <Dropdown.Item eventKey={3}>Cuti masuk kembali</Dropdown.Item>
                                <Dropdown.Item eventKey={4}>Off</Dropdown.Item>
                            </DropdownButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
