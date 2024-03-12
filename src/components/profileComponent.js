import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/lihatprofil.css";
import Button from "./button";

const ProfileComponent = () => {
  const history = useHistory();

  const handlePasswordChange = () => {
    history.push("/ubah-password");
  };

  return (
    <div className="profile-container">
      <div className="right-section">
        <div className="info1">
          <div className="row">
            <div className="label">Nama</div>
          </div>
          <div className="row">
            <div className="profile-info-container">
              <div className="profile-info">Abdillah Katab Panggabean</div>
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
                <div className="profile-info">Karyawan</div>
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
  );
};

export default ProfileComponent;
