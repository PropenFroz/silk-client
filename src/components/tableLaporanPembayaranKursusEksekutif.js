import React from 'react';
import { Table } from 'react-bootstrap';
import '../styles/tableLaporan.css';

export default function TabelLaporanPembayaranKursusEksekutif({ transactions }) {

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', options);
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
                            <td>{transaction.uangPendaftaran}</td>
                            <td>{transaction.uangKursus}</td>
                            <td>{transaction.cash}</td>
                            <td>{transaction.transfer}</td>
                            <td>{transaction.cash + transaction.transfer}</td>
                            <td>{transaction.keterangan}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="5">Total</td>
                        <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.uangPendaftaran, 0)}`}</td>
                        <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.uangKursus, 0)}`}</td>
                        <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.cash, 0)}`}</td>
                        <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.transfer, 0)}`}</td>
                        <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + ( transaction.cash + transaction.transfer), 0)}`}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}