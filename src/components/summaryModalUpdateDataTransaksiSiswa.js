import React from "react";
import Modal from 'react-bootstrap/Modal';
import sendEntryData from "../service/entryDataTransaksiSiswaService";
import updateEntryData from "../service/updateDataTransaksiSiswaService";

function SummaryModal({ id,  formData, show, onHide, onSuccess }) {

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', options);
    };

    const handleSubmit = async () => {
        try {
          await updateEntryData(id, formData);
          onHide();
          onSuccess();
        } catch (error) {
          console.error("Error updating entry data:", error);
          // Handle error accordingly, such as showing an error message to the user
        }
      };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Title>Ringkasan Formulir</Modal.Title>
      <Modal.Body>
        <p><strong>Jenis Pembayaran:</strong> {
            (() => {
                switch (formData.jenisTransaksi) {
                    case 1:
                        return 'Pendaftaran';
                    case 2:
                        return 'Kursus';
                    default:
                        return 'Lainnya';
                }
            })()
        }</p>
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
