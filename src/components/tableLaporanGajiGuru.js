import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "../styles/tableLaporan.css";
import Button from "./button";
import DeleteConfirmationModal from "./deleteModalLaporanBuku";
import { deleteEntryGajiGuruDetail } from "../service/deleteEntryGajiGuruDetailService";
import { useHistory } from "react-router-dom";
import { config } from "../Constants"

export default function TabelLaporanGajiGuru({ transactions, idGuru, startDate, endDate, setTransactions }) {
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

  const handleDelete = async () => {
    try {
      const isDeleted = await deleteEntryGajiGuruDetail(selectedTransactionId);
      if (isDeleted) {
        const updatedTransactions = await fetchData(idGuru, startDate, endDate);
        setTransactions(updatedTransactions);
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
};

  const fetchData = async (startDate, endDate) => {
    try {
      const formattedStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];
      const formattedEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];
      const url = `${baseUrl}entry-gaji-guru/filter?idGuru=${parseInt(idGuru)}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  if (!transactions || transactions.length === 0) {
    if (!startDate || !endDate || !idGuru) {
      return <div>Mohon Pilih Guru dan Tanggal Terlebih Dahulu!</div>;
    } else {
      return <div> </div>;
    }
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

  const handleUpdate = (transactionId) => {
    history.push(`/update-gaji-guru/${transactionId}`);
  };

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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction.siswa.namaSiswa}</td>
                    <td>{transaction.siswa.gradeKursus.namaGrade}</td>
                    <td>{transaction.uangKursus}</td>
                    <td>{formatDate(transaction.tanggal)}</td>
                    <td>{transaction.minggu1}</td>
                    <td>{transaction.minggu2}</td>
                    <td>{transaction.minggu3}</td>
                    <td>{transaction.minggu4}</td>
                    <td>{transaction.feeGuru}</td>
                    <td>{transaction.keterangan}</td>
                    <td>
                      <Button className="btn-update" onClick={() => handleUpdate(transaction.id)}>
                        Update
                      </Button>
                      <Button className="btn-delete" onClick={() => handleShowDeleteModal(transaction.id)}>
                        Delete
                      </Button>
                    </td>
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
        <DeleteConfirmationModal show={showDeleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
