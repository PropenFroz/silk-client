import React from "react";
import { Table } from "react-bootstrap";
import "../styles/tableLaporan.css";

export default function TabelLaporanGajiGuruEksekutif({ transactions }) {

  if (!transactions || transactions.length === 0) {
    return <div>Data Tidak Ditemukan</div>;
  }

  const transactionsByJurusan = transactions.reduce((acc, transaction) => {
    const { namaJurusan } = transaction.entryGajiGuru.jurusanKursus;
    if (!acc[namaJurusan]) {
      acc[namaJurusan] = [];
    }
    acc[namaJurusan].push(transaction);
    return acc;
  }, {});

  const totalFeeGuruPerJurusan = Object.entries(transactionsByJurusan).map(([jurusan, transactions]) => ({
    jurusan,
    totalFeeGuru: transactions.reduce((acc, curr) => acc + curr.feeGuru, 0),
  }));

  const totalFeeGuru = totalFeeGuruPerJurusan.reduce((acc, { totalFeeGuru }) => acc + totalFeeGuru, 0);

  return (
    <div>
      {Object.entries(transactionsByJurusan).map(([jurusan, transactions]) => (
        <div key={jurusan}>
          <div className="table-wrapper">
            <h2 style={{ fontSize: "1rem" }}>Jurusan: {jurusan}</h2>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama Siswa</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Uang Kursus</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Minggu 1</th>
                  <th scope="col">Minggu 2</th>
                  <th scope="col">Minggu 3</th>
                  <th scope="col">Minggu 4</th>
                  <th scope="col">Fee Guru (40%)</th>
                  <th scope="col">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction.siswa.namaSiswa}</td>
                    <td>{transaction.siswa.gradeKursus.namaGrade}</td>
                    <td>{transaction.uangKursus}</td>
                    <td>{transaction.tanggal}</td>
                    <td>{transaction.minggu1}</td>
                    <td>{transaction.minggu2}</td>
                    <td>{transaction.minggu3}</td>
                    <td>{transaction.minggu4}</td>
                    <td>{transaction.feeGuru}</td>
                    <td>{transaction.keterangan}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5">
                    <strong>Total</strong>
                  </td>
                  <td>{transactions.reduce((acc, curr) => acc + curr.minggu1, 0)}</td>
                  <td>{transactions.reduce((acc, curr) => acc + curr.minggu2, 0)}</td>
                  <td>{transactions.reduce((acc, curr) => acc + curr.minggu3, 0)}</td>
                  <td>{transactions.reduce((acc, curr) => acc + curr.minggu4, 0)}</td>
                  <td>{transactions.reduce((acc, curr) => acc + curr.feeGuru, 0)}</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      ))}

      <div className="table-wrapper">
        <h2 style={{ fontSize: "1rem" }}>Rincian Fee Guru</h2>
        <Table responsive bordered>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Jurusan</th>
              <th scope="col">Fee Guru</th>
            </tr>
          </thead>
          <tbody>
            {totalFeeGuruPerJurusan.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.jurusan}</td>
                <td>{item.totalFeeGuru}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2">
                <strong>Total Fee Guru</strong>
              </td>
              <td>{totalFeeGuru}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
