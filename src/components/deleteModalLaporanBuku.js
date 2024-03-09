import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteConfirmationModal({ show, handleClose, handleDelete }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Konfirmasi Penghapusan</Modal.Title>
      </Modal.Header>
      <Modal.Body>Apakah Anda yakin ingin menghapus data ini?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Batal
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Hapus
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
