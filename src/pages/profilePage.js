import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; //
import Sidebar from "../components/sidebarKaryawan";
import SidebarAdmin from '../components/sidebarAdmin'; // Import Sidebar component
import "../styles/lihatprofil.css";
import ProfileComponent from "../components/profileComponent"; // Correct import path
import Button from "../components/button";
import CustomDatePicker from "../components/datePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from '../components/auth/context/AuthContext';

export default function ProfilePage() {
  // Dummy data for user role, replace it with actual user data

  const Auth = useAuth();
  const user = Auth.getUser();

  // Render Sidebar based on user role
  const renderSidebar = () => {
    if (user.data.role == "Admin") {
      return <SidebarAdmin />;
    } else {
      return <Sidebar />;
    }
  };

  const history = useHistory();

  useEffect(() => {
    // Periksa apakah pengguna telah masuk saat komponen dimuat
    if (user == null) {
        // Jika pengguna tidak masuk, arahkan mereka ke halaman login
        history.push('/login');
    }
}, [user, history]); // Tambahkan user dan history ke dependency array agar useEffect dipanggil ulang saat mereka berubah



  return (
    <div className="dashboard d-flex">
      <div>
        {/* Render sidebar based on user role */}
        {renderSidebar()}
      </div>
      <div className="col-md-9 d-flex align-items-center justify-content-center">
        <div className="profile-content">
          <h2 className="text-center mb-4">My Profile</h2>
          <ProfileComponent />
        </div>
      </div>
    </div>
  );
}