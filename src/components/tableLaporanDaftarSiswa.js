import React, { useState, useEffect } from 'react';
import { Table, DropdownButton, Dropdown } from 'react-bootstrap';
import '../styles/tableLaporan.css';
import '../styles/statusSiswa.css';
import { useHistory } from "react-router-dom";
import { config } from "../Constants"

export default function TableLaporan({ transactions }) {
    const history = useHistory();
    const baseUrl = config.url.API_BASE_URL + '/api/';

    const handleStatusChange = async (transactionId, newStatus) => {
        try {
            const response = await fetch(`${baseUrl}siswa/update/${transactionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idSiswa: transactionId, status: newStatus })
            });
            if (response.ok) {
                // Refresh halaman setelah perubahan disimpan
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

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
                                onSelect={(eventKey) => handleStatusChange(transaction.idSiswa, eventKey)}
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
