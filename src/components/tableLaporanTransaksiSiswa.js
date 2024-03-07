import React from 'react';
import { Table } from 'react-bootstrap';
import '../styles/tableLaporan.css';
import Button from './button';

export default function TabelLaporanTransaksiSiswa({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return <div>Mohon Pilih Tanggal Terlebih Dahulu!</div>;
    }
    return (
        <div className="table-wrapper">
            <Table responsive bordered>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Tanggal Bayar</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Jurusan</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Uang Pendaftaran</th>
                        <th scope="col">Uang Kursus</th>
                        <th scope="col">Uang Buku</th>
                        <th scope="col">Cash</th>
                        <th scope="col">Transfer</th>
                        <th scope="col">Jumlah</th>
                        <th scope="col">Keterangan</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{transaction.tanggalPembayaran}</td>
                            <td>{transaction.namaSiswa}</td>
                            <td>{transaction.jurusanKursus.namaJurusan}</td>
                            <td>{transaction.gradeKursus.namaGrade}</td>
                            <td>{transaction.uangPendaftaran}</td>
                            <td>{transaction.uangKursus}</td>
                            <td>{transaction.uangBuku}</td>
                            <td>{transaction.cash}</td>
                            <td>{transaction.transfer}</td>
                            <td>{transaction.cash + transaction.transfer}</td>
                            <td>{transaction.keterangan}</td>
                            <td>
                                <Button className="btn-update">Update</Button> 
                                <Button className="btn-delete">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
