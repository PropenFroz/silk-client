import React, { useState } from "react";
import "../styles/lihatprofil.css";
import { useHistory } from "react-router-dom";
import { useAuth } from '../components/auth/context/AuthContext';
import UbahPassword from "./modalUbahPassword";
import BerhasilUbahPassword from "./modalSuccessUpdatePass";
import profile from "../components/icons/profile.png";

export default function ProfileComponent() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const Auth = useAuth();
  const user = Auth.getUser();
  const history = useHistory();

  const handlePasswordChange = () => {
    setShowModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    window.location.reload(); // Reload the page after successful password change
  };

  return (
    <div className="profile-component">
      <div className="profile-info-component">
        <div className="left-section">
          <img src={profile} alt="Profile" className="profile-icon" />
        </div>
        <div className="right-section">
          <div className="info1">
            <div className="row">
              <div className="label">Nama</div>
            </div>
            <div className="row">
              <div className="profile-info-container">
                <div className="profile-info">{user.data.sub}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="info2">
              <div className="row">
                <div className="label">Role</div>
              </div>
              <div className="row">
                <div className="profile-info-container">
                  <div className="profile-info">{user.data.role}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="info3">
              <button className="btn-submit" onClick={handlePasswordChange}>Change Password</button>
            </div>
          </div>
        </div>
      </div>
      <UbahPassword
        show={showModal}
        onHide={() => setShowModal(false)}
        onSuccess={() => setShowSuccessModal(true)}
      />
      <BerhasilUbahPassword
        show={showSuccessModal}
        onHide={handleSuccessModalClose}
      />
    </div>
  );
  
}