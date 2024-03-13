import React from "react";
import Modal from "react-bootstrap/Modal";
import "../styles/modal.css";

function ModalUbahPassword({ formData, show, onHide, onSuccess }) {
  const handleSubmit = () => {
    onHide();
    onSuccess();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Title>Change Password</Modal.Title>
      <Modal.Body>
        <div className="label">Current Password</div>
        <div className="password">xxxxxxxxxxx</div>
        <div className="label">New Password</div>
        <div className="password">xxxxxxxxxx</div>
        <div className="label">Confirm Password</div>
        <div className="password">xxxxxxxxxx</div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-submit" onClick={handleSubmit}>
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUbahPassword;
