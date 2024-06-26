import React from "react";
import Modal from 'react-bootstrap/Modal';
import updateEntryData from "../service/updateDataKursusSiswaService";

function SummaryModal({ id, formData, selectedSiswa, show, onHide, onSuccess }) {

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', options);
    };

    const monthNames = [
        "Januari", "Februari", "Maret",
        "April", "Mei", "Juni", "Juli",
        "Agustus", "September", "Oktober",
        "November", "Desember"
    ];

    const handleSubmit = async () => {
        try {
          await updateEntryData(id, formData);
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
                <p><strong>Tahun Kursus:</strong> {formData.tahunKursus}</p>
                <p><strong>Bulan Kursus:</strong> {monthNames[formData.bulanKursus - 1]}</p>
                <p><strong>Tanggal Pembayaran:</strong> {formatDate(formData.tanggalPembayaran)}</p>
                <p><strong>Nama Siswa:</strong> {selectedSiswa}</p>
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
