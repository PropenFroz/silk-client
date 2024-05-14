import React from "react";
import Modal from "react-bootstrap/Modal";
import sendEntryData from "../service/entryPembelianBukuService";

function formatRupiah(amount) {
  const formatted = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount);
  return formatted.replace(/\s/g, "");
}
function SummaryModal({ namaBuku, namaJurusan, formData, show, onHide, onSuccess }) {
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
          <strong>Harga Beli:</strong> {formatRupiah(formData.hargaBeli)}
        </p>
        <p>
          <strong>Harga Jual:</strong> {formatRupiah(formData.hargaJual)}
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
