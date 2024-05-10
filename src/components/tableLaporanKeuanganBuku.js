// TableLaporanKeuanganBuku.js
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "../styles/tableLaporan.css";
import Button from "./button";
import DeleteConfirmationModal from "./deleteModalLaporanBuku";
import { deleteEntryTransaksiBuku } from "../service/deleteDataTransaksiBukuService";
import { useHistory } from "react-router-dom";
import { config } from "../Constants"

export default function TabelLaporanTransaksiBuku({ transactions, startDate, endDate, setTransactions }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const history = useHistory();
  const baseUrl = config.url.API_BASE_URL + '/api/';

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowDeleteModal = (transactionId) => {
    setSelectedTransactionId(transactionId);
    setShowDeleteModal(true);
  };

  if (!transactions || transactions.length === 0) {
    return <div>Data Tidak Ditemukan</div>;
  }

  const handleUpdate = (transactionId) => {
    history.push(`/update-pembelian-buku/${transactionId}`);
  };

  const handleDelete = async () => {
    try {
      const isDeleted = await deleteEntryTransaksiBuku(selectedTransactionId);
      if (isDeleted) {
        const updatedTransactions = await fetchData(startDate, endDate);
        setTransactions(updatedTransactions);
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async (startDate, endDate) => {
    try {
      const formattedStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];
      const formattedEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];
      const url = `${baseUrl}entry-transaksi-buku/filter-by-date?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  return (
    <div className="table-wrapper">
      <Table responsive bordered>
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama Buku</th>
            <th scope="col">Jurusan</th>
            <th scope="col">Tanggal Beli</th>
            <th scope="col">Jumlah Beli</th>
            <th scope="col">Tanggal Jual</th>
            <th scope="col">Jumlah Jual</th>
            <th scope="col">Harga Beli</th>
            <th scope="col">Harga Jual</th>
            <th scope="col">Keuntungan</th>
            <th scope="col">Total Keuntungan</th>
            <th scope="col">Total Penjualan</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{transaction.bukuPurwacaraka.namaBuku}</td>
              <td>{transaction.bukuPurwacaraka.jurusanKursus.namaJurusan}</td>
              <td>{transaction.tanggalBeli}</td>
              <td>{transaction.jumlahBeli}</td>
              <td>{transaction.tanggalJual}</td>
              <td>{transaction.jumlahJual}</td>
              <td>{`Rp${transaction.hargaBeli.toLocaleString()}`}</td>
              <td>{`Rp${transaction.hargaJual.toLocaleString()}`}</td>
              <td>{`Rp${transaction.hargaJual - transaction.hargaBeli}`}</td>
              <td>{`Rp${transaction.jumlahJual * (transaction.hargaJual - transaction.hargaBeli)}`}</td>
              <td>{`Rp${transaction.jumlahJual * transaction.hargaJual}`}</td>
              <td>
                <Button className="btn-update" onClick={() => handleUpdate(transaction.idEntryBuku)}>
                  Update
                </Button>
                <Button className="btn-delete" onClick={() => handleShowDeleteModal(transaction.idEntryBuku)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan="10">Total</td>
            <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.jumlahJual * (transaction.hargaJual - transaction.hargaBeli), 0)}`}</td>
            <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.jumlahJual * transaction.hargaJual, 0)}`}</td>
            <td colSpan="1"></td>
          </tr>
        </tbody>
      </Table>
      <DeleteConfirmationModal show={showDeleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete} />
    </div>
  );
}
