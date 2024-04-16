import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import '../styles/modal.css';
import { config } from "../Constants"
function ModalUbahPassword({ show, onHide, onSuccess }) {
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const baseUrl = config.url.API_BASE_URL + '/api/';

  const handleChangePassword = async () => {
    try {
      const response = await fetch(`${baseUrl}user/4`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword })
      });

      if (response.ok) {
        onSuccess();
        onHide();
      } 
      else if (!response.ok) {
        // Tangkap pesan error dari respons
        const errorMessage = await response.text();
        // Tampilkan pesan error kepada pengguna
        setErrorMessage(errorMessage);
        return;
      } 
      {
        // Handle error response
        console.error('Failed to change password:', response.statusText);
      }
    } catch (error) {
      // Handle network errors

      console.error('Failed to change password:', error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
                      {/* Tampilkan pesan kesalahan jika ada */}
                      {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}
      <Modal.Title>Change Password</Modal.Title>
      <Modal.Body>
        <div className="label">New Password</div>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-submit" onClick={handleChangePassword}>Submit</button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUbahPassword;
