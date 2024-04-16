import React from "react";
import Modal from "react-bootstrap/Modal";
import updateEntryGajiGuru from "../service/updateDataGajiGuruService";

function SummaryModal({ formData, selectedSiswa, namaGuru, show, onHide, onSuccess, id }) {
  const handleSubmit = async () => {
    try {
      await updateEntryGajiGuru(id, formData);
      onHide();
      onSuccess();
    } catch (error) {
      console.error("Error updating entry data:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Title>Ringkasan Formulir</Modal.Title>
      <Modal.Body>
        <p>
          <strong>Nama Guru:</strong> {namaGuru}
        </p>
        <p>
          <strong>Siswa:</strong> {selectedSiswa}
        </p>
        <p>
          <strong>Uang Kursus:</strong> {formData.uangKursus}
        </p>
        <p>
          <strong>Tanggal:</strong> {formData.tanggal}
        </p>
        <p>
          <strong>Minggu 1:</strong> {formData.minggu1}
        </p>
        <p>
          <strong>Minggu 2:</strong> {formData.minggu2}
        </p>
        <p>
          <strong>Minggu 3:</strong> {formData.minggu3}
        </p>
        <p>
          <strong>Minggu 4:</strong> {formData.minggu4}
        </p>
        <p>
          <strong>Fee Guru:</strong> {formData.feeGuru}
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
