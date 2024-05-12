import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "../styles/tableLaporan.css";

export default function TabelLaporanTransaksiBukuEksekutif({ transactions, viewClicked }) {

  const [sortedTransactions, setSortedTransactions] = useState([]);

  useEffect(() => {
    const sortTransactions = () => {
      const sorted = [...transactions];
      sorted.sort((a, b) => new Date(a.tanggalBeli) - new Date(b.tanggalBeli));
      setSortedTransactions(sorted);
    };

    if (transactions && transactions.length > 0) {
      sortTransactions();
    }
  }, [transactions]);

  if (viewClicked === false) {
    return <div>Mohon Pilih Tanggal Terlebih Dahulu!</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <div>Data Tidak Ditemukan</div>;
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
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
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{transaction.bukuPurwacaraka.namaBuku}</td>
              <td>{transaction.bukuPurwacaraka.jurusanKursus.namaJurusan}</td>
              <td>{formatDate(transaction.tanggalBeli)}</td>
              <td>{transaction.jumlahBeli}</td>
              <td>{formatDate(transaction.tanggalJual)}</td>
              <td>{transaction.jumlahJual}</td>
              <td>{`Rp${transaction.hargaBeli.toLocaleString()}`}</td>
              <td>{`Rp${transaction.hargaJual.toLocaleString()}`}</td>
              <td>{`Rp${(transaction.hargaJual - transaction.hargaBeli).toLocaleString()}`}</td>
              <td>{`Rp${(transaction.jumlahJual * (transaction.hargaJual - transaction.hargaBeli)).toLocaleString()}`}</td>
              <td>{`Rp${(transaction.jumlahJual * transaction.hargaJual).toLocaleString()}`}</td>
            </tr>
          ))}

          <tr>
            <td colSpan="10">Total</td>
            <td colSpan="1">{`Rp${(transactions.reduce((sum, transaction) => sum + transaction.jumlahJual * (transaction.hargaJual - transaction.hargaBeli), 0)).toLocaleString()}`}</td>
            <td colSpan="1">{`Rp${(transactions.reduce((sum, transaction) => sum + transaction.jumlahJual * transaction.hargaJual, 0)).toLocaleString()}`}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
