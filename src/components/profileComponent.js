import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/lihatprofil.css";
import Button from "./button";

import { useAuth } from '../components/auth/context/AuthContext';

const ProfileComponent = () => {
  const history = useHistory();

  const handlePasswordChange = () => {
    history.push("/ubah-password");
  };

  const Auth = useAuth();
  const user = Auth.getUser();

  return (
    <div className="profile-container">
      <div className="right-section">
        <div className="info1">
          <div className="row">
            <div className="label">Nama</div>
          </div>
          <div className="row">
            <div className="profile-info-container">
              {/* Menggunakan user.data.sub */}
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
                {/* Menggunakan user.data.role */}
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
  );
};

export default ProfileComponent;
