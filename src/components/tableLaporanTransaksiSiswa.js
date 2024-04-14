import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import '../styles/tableLaporan.css';
import Button from './button';
import DeleteConfirmationModal from './deleteModalLaporanTransaksiSiswa';
import { deleteEntryTransaksiSiswa } from '../service/deleteDataTransaksiSiswaService';
import { useHistory } from "react-router-dom";


export default function TabelLaporanTransaksiSiswa({ transactions, startDate, endDate, setTransactions }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    const history = useHistory();

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleShowDeleteModal = (transactionId) => {
        setSelectedTransactionId(transactionId);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            const isDeleted = await deleteEntryTransaksiSiswa(selectedTransactionId);
            if (isDeleted) {
                const updatedTransactions = await fetchData(startDate, endDate);
                setTransactions(updatedTransactions);
                setShowDeleteModal(false); // Sembunyikan modal jika penghapusan berhasil
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchData = async (startDate, endDate) => {
        try {
            const formattedStartDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const formattedEndDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const url = `http://localhost:8080/api/entry-transaksi-siswa/filter-by-date?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
          console.error("Error fetching data:", error);
          return [];
        }
      };

    const handleUpdate = (transactionId, jenisTransaksi) => {
        if (jenisTransaksi === 2) {
            history.push(`/update-kursus-siswa/${transactionId}`);
        } else {
            history.push(`/update-transaksi-siswa/${transactionId}`);
        }
    };

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
                            <td>{formatDate(transaction.tanggalPembayaran)}</td>
                            <td>{transaction.siswa.namaSiswa}</td>
                            <td>{transaction.siswa.jurusanKursus.namaJurusan}</td>
                            <td>{transaction.siswa.gradeKursus.namaGrade}</td>
                            <td>{transaction.uangPendaftaran}</td>
                            <td>{transaction.uangKursus}</td>
                            <td>{transaction.uangBuku}</td>
                            <td>{transaction.cash}</td>
                            <td>{transaction.transfer}</td>
                            <td>{transaction.cash + transaction.transfer}</td>
                            <td>{transaction.keterangan}</td>
                            <td>
                                <Button className="btn-update" onClick={() => handleUpdate(transaction.idEntryTransaksiSiswa, transaction.jenisTransaksi)}>Update</Button> 
                                <Button className="btn-delete" onClick={() => handleShowDeleteModal(transaction.idEntryTransaksiSiswa)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="5">Total</td>
                        <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.uangPendaftaran, 0)}`}</td>
                        <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.uangKursus, 0)}`}</td>
                        <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.uangBuku, 0)}`}</td>
                        <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.cash, 0)}`}</td>
                        <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.transfer, 0)}`}</td>
                        <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + ( transaction.cash + transaction.transfer), 0)}`}</td>
                        <td colSpan="1"></td>
                    </tr>
                </tbody>
            </Table>
            <DeleteConfirmationModal 
                show={showDeleteModal} 
                handleClose={handleCloseDeleteModal} 
                handleDelete={handleDelete} 
            />
        </div>
    )
}
