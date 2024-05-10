// TableLaporanKeuanganBuku.js
import React from "react";
import { Table } from "react-bootstrap";
import "../styles/tableLaporan.css";

export default function TabelLaporanTransaksiBukuEksekutif({ transactions }) {

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
          {transactions.map((transaction, index) => (
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
              <td>{`Rp${transaction.hargaJual - transaction.hargaBeli}`}</td>
              <td>{`Rp${transaction.jumlahJual * (transaction.hargaJual - transaction.hargaBeli)}`}</td>
              <td>{`Rp${transaction.jumlahJual * transaction.hargaJual}`}</td>
            </tr>
          ))}

          <tr>
            <td colSpan="10">Total</td>
            <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.jumlahJual * (transaction.hargaJual - transaction.hargaBeli), 0)}`}</td>
            <td colSpan="1">{`Rp${transactions.reduce((sum, transaction) => sum + transaction.jumlahJual * transaction.hargaJual, 0)}`}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
