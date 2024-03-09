import React from "react";
import Button from "../components/button";
import UserIcon from "../components/icons/userLogo.png";
import "../styles/lihatprofil.css";

export default function ProfilePage() {
  return (
    <div className="ProfilePage">
      <div className="group">
        <div className="overlap-group">
          <img className="User" alt="User" src={UserIcon} />
          <Button
            className="full-width-button-instance"
            divClassName="design-component-instance-node"
            state="hover"
            text="Change Password"
            type="outline"
          />
          <div className="div">
            <div className="text-field">
              <div className="label">Nama</div>
              <div className="text-field-2">
                <div className="placeholder">Abdillah Katab Panggabean</div>
              </div>
            </div>
            <div className="text-field-3">
              <div className="label">Role</div>
              <div className="text-field-2">
                <div className="placeholder">Karyawan</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-wrapper">My Profile</div>
      </div>
    </div>
  );
}
