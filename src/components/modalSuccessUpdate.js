import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';
import '../styles/modal.css';

function Berhasil({show, onHide}) {
    const history = useHistory(); // Mendapatkan objek history

    const handleBackToReport = () => {
        onHide();
        history.push('/laporan-transaksi-siswa');
    };


  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Body>Berhasil perbaharui data!</Modal.Body>
       <Modal.Footer>
       <button className="button-back" onClick={handleBackToReport}>
            Kembali
        </button>
       </Modal.Footer>
     
      </Modal>
    </>
  );
}

export default Berhasil;