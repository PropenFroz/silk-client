import React from "react";
import { Table } from "react-bootstrap";
import "../styles/tableLaporan.css";
import Button from "./button";

export default function TabelLaporanTransaksiBuku({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <div>No transactions available</div>;
  }

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
                <Button className="btn-update">Update</Button>
                <Button className="btn-delete">Delete</Button>
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
    </div>
  );
}