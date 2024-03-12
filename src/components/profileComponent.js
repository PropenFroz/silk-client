// components/LihatProfile.js
import React, { useState} from "react";
import "../styles/profileComponent.css";
import profile from "../components/icons/profile.png";
import UbahPassword from './modalUbahPassword';
import BerhasilUbahPassword from './modalSuccesUpdatePass';

export default function ProfileComponent(){
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleSubmit = () => setShowModal(true);

  return (
    <div className="frame-profile">
      <div className="frame-section">
        <div className="left-section">
          <img className="logo-profile" alt="" src={profile} />
        </div>
        <div className="right-section">
              <div className="label">Nama</div>
              <div className="profile-info">Abdillah Katab Panggabean</div>
              <div className="label">Role</div>
              <div className="profile-info">Karyawan</div>
              <button type="button" className="btn-submit" onClick={handleSubmit}>Change Password</button>
              <UbahPassword
                show={showModal}
                onHide={() => setShowModal(false)}
                onSuccess={() => {
                    setShowSuccessModal(true);
                }}
            />
            <BerhasilUbahPassword 
                show={showSuccessModal}
                onHide={() => {
                    setShowSuccessModal(false);
                    window.location.reload()
                }}
            />
        </div>
      </div>
    </div>
  );
};

