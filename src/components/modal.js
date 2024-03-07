import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../styles/modal.css';

function Berhasil() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button type="submit" className="btn-submit" onClick={handleShow}>Submit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Berhasil menambahkan data!</Modal.Body>
       <Modal.Footer>
       <button className="button-back" onClick={handleClose}>
            Kembali
          </button>
       </Modal.Footer>
     
      </Modal>
    </>
  );
}

export default Berhasil;