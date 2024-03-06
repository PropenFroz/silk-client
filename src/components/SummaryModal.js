import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalBerhasil from './modal'; 


function SummaryModal({ formData, show, onHide }) {

  return (
    <Modal show={show} onHide={onHide}>
        <Modal.Title>Ringkasan Formulir</Modal.Title>
      <Modal.Body>
        <p><strong>Jenis Pembayaran:</strong> {formData.jenisPembayaran}</p>
        <p><strong>Tanggal Pembayaran:</strong> {formData.tanggalPembayaran}</p>
        <p><strong>Nama Siswa:</strong> {formData.namaSiswa}</p>
        <p><strong>Jurusan:</strong> {formData.jurusan}</p>
        <p><strong>Grade:</strong> {formData.grade}</p>
        <p><strong>Uang Pendaftaran:</strong> {formData.uangPendaftaran}</p>
        <p><strong>Uang Kursus:</strong> {formData.uangKursus}</p>
        <p><strong>Uang Buku:</strong> {formData.uangBuku}</p>
        <p><strong>Cash:</strong> {formData.cash}</p>
        <p><strong>Transfer:</strong> {formData.transfer}</p>
        <p><strong>Keterangan:</strong> {formData.keterangan}</p>
      </Modal.Body>
      <Modal.Footer>
        <ModalBerhasil></ModalBerhasil> {/* Ganti Submit dengan Button */}
      </Modal.Footer>
    </Modal>
  );
}

export default SummaryModal;