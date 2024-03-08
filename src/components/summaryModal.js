import React from "react";
import Modal from 'react-bootstrap/Modal';
import sendEntryData from "../service/entryDataTransaksiSiswaService";

function SummaryModal({ formData, show, onHide, onSuccess }) {

  const handleSubmit = () => {
    sendEntryData(formData, () => {
      onHide();
      onSuccess();
    });
    
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Title>Ringkasan Formulir</Modal.Title>
      <Modal.Body>
        <p><strong>Jenis Pembayaran:</strong> {formData.jenisTransaksi}</p>
        <p><strong>Tanggal Pembayaran:</strong> {formData.tanggalPembayaran}</p>
        <p><strong>Nama Siswa:</strong> {formData.namaSiswa}</p>
        <p><strong>Jurusan:</strong> {formData.jurusanKursus}</p>
        <p><strong>Grade:</strong> {formData.gradeKursus}</p>
        <p><strong>Uang Pendaftaran:</strong> {formData.uangPendaftaran}</p>
        <p><strong>Uang Kursus:</strong> {formData.uangKursus}</p>
        <p><strong>Uang Buku:</strong> {formData.uangBuku}</p>
        <p><strong>Cash:</strong> {formData.cash}</p>
        <p><strong>Transfer:</strong> {formData.transfer}</p>
        <p><strong>Keterangan:</strong> {formData.keterangan}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-submit" onClick={handleSubmit}>Submit</button>
      </Modal.Footer>
    </Modal>
  );
}

export default SummaryModal;
