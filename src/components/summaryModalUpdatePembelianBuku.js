import React from "react";
import Modal from "react-bootstrap/Modal";
import sendEntryData from "../service/updatePembelianBukuService";

function SummaryModal({ formData, namaBuku, namaJurusan, show, onHide, onSuccess, id }) {
  const handleSubmit = () => {
    sendEntryData(
      formData,
      () => {
        onHide();
        onSuccess();
      },
      id
    );
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Title>Ringkasan Formulir</Modal.Title>
      <Modal.Body>
        <p>
          <strong>Nama Buku:</strong> {namaBuku}
        </p>
        <p>
          <strong>Jurusan:</strong> {namaJurusan}
        </p>
        <p>
          <strong>Tanggal Beli:</strong> {formData.tanggalBeli}
        </p>
        <p>
          <strong>Jumlah Beli:</strong> {formData.jumlahBeli}
        </p>
        <p>
          <strong>Tanggal Jual:</strong> {formData.tanggalJual}
        </p>
        <p>
          <strong>Jumlah Jual:</strong> {formData.jumlahJual}
        </p>
        <p>
          <strong>Harga Beli:</strong> {formData.hargaBeli}
        </p>
        <p>
          <strong>Harga Jual:</strong> {formData.hargaJual}
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
