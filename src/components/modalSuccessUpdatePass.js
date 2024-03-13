import React from "react";
import Modal from "react-bootstrap/Modal";
import "../styles/modal.css";

function BerhasilUpdatePassword({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>Berhasil mengubah password!</Modal.Body>
      <Modal.Footer>
        <button className="button-back" onClick={onHide}>
          Kembali
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default BerhasilUpdatePassword;
