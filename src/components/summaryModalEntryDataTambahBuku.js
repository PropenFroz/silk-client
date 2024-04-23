import React from "react";
import Modal from 'react-bootstrap/Modal';
import sendEntryData from "../service/entryDataTambahBuku";

function SummaryModal({ formData, selectedJurusan, show, onHide, onSuccess }) {

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
        <p><strong>Nama Buku:</strong> {formData.namaSiswa}</p>
        <p><strong>Jurusan:</strong> {selectedJurusan}</p>
        <p><strong>Stok Buku:</strong> {formData.stokBuku}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-submit" onClick={handleSubmit}>Submit</button>
      </Modal.Footer>
    </Modal>
  );
}

export default SummaryModal;
