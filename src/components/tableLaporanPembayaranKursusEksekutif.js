import React from 'react';
import { Table } from 'react-bootstrap';
import '../styles/tableLaporan.css';

export default function TabelLaporanPembayaranKursusEksekutif({ transactions, selectedJurusan, startDate, endDate }) {

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', options);
    };

    if (!selectedJurusan || !startDate || !endDate) {
        return <div>Mohon Pilih Jurusan dan Tanggal Terlebih Dahulu!</div>;
    }

    if (transactions.length === 0) {
        return <div> </div>;
    }

    return (
        <div className="table-wrapper">
            <Table responsive bordered>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Siswa</th>
                        <th scope="col">Tanggal Bayar</th>
                        <th scope="col">Tanggal Daftar</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Uang Pendaftaran</th>
                        <th scope="col">Uang Kursus</th>
                        <th scope="col">Cash</th>
                        <th scope="col">Transfer</th>
                        <th scope="col">Jumlah</th>
                        <th scope="col">Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{transaction.siswa.namaSiswa}</td>
                            <td>{formatDate(transaction.tanggalPembayaran)}</td>
                            <td>{formatDate(transaction.siswa.tanggalDaftar)}</td>
                            <td>{transaction.siswa.gradeKursus.namaGrade}</td>
                            <td>{`Rp${transaction.uangPendaftaran.toLocaleString()}`}</td>
                            <td>{`Rp${transaction.uangKursus.toLocaleString()}`}</td>
                            <td>{`Rp${transaction.cash.toLocaleString()}`}</td>
                            <td>{`Rp${transaction.transfer.toLocaleString()}`}</td>
                            <td>{`Rp${(transaction.cash + transaction.transfer).toLocaleString()}`}</td>
                            <td>{transaction.keterangan}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="5">Total</td>
                        <td colSpan="1">{`Rp${(transactions.reduce((sum, transaction) => sum + transaction.uangPendaftaran, 0)).toLocaleString()}`}</td>
                        <td colSpan="1">{`Rp${(transactions.reduce((sum, transaction) => sum + transaction.uangKursus, 0)).toLocaleString()}`}</td>
                        <td colSpan="1">{`Rp${(transactions.reduce((sum, transaction) => sum + transaction.cash, 0)).toLocaleString()}`}</td>
                        <td colSpan="1">{`Rp${(transactions.reduce((sum, transaction) => sum + transaction.transfer, 0)).toLocaleString()}`}</td>
                        <td colSpan="1">{`Rp${(transactions.reduce((sum, transaction) => sum + ( transaction.cash + transaction.transfer), 0)).toLocaleString()}`}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}