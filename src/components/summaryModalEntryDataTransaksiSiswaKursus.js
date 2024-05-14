import React from "react";
import Modal from "react-bootstrap/Modal";
import sendEntryData from "../service/entryDataTransaksiSiswaKursusService";

function formatRupiah(amount) {
  const formatted = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount);
  return formatted.replace(/\s/g, "");
}

function SummaryModal({ formData, selectedSiswa, selectedMonth, show, onHide, onSuccess }) {
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
        <p>
          <strong>Jenis Pembayaran:</strong> Kursus
        </p>
        <p>
          <strong>Tahun Kursus:</strong> {formData.tahunKursus}
        </p>
        <p>
          <strong>Bulan Kursus:</strong> {selectedMonth}
        </p>
        <p>
          <strong>Tanggal Pembayaran:</strong> {formData.tanggalPembayaran}
        </p>
        <p>
          <strong>Nama Siswa:</strong> {selectedSiswa}
        </p>
        <p>
          <strong>Uang Kursus:</strong> {formatRupiah(formData.uangKursus)}
        </p>
        <p>
          <strong>Cash:</strong> {formatRupiah(formData.cash)}
        </p>
        <p>
          <strong>Transfer:</strong> {formatRupiah(formData.transfer)}
        </p>
        <p>
          <strong>Keterangan:</strong> {formData.keterangan}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-submit" onClick={handleSubmit}>
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default SummaryModal;
