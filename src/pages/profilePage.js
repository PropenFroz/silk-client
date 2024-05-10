import React, {useEffect } from 'react';
import { useHistory } from 'react-router-dom'; //
import SidebarEksekutif from "../components/sidebarEksekutif";
import SidebarKaryawan from "../components/sidebarKaryawan";
import SidebarGuru from "../components/sidebarGuru";
import SidebarAdmin from '../components/sidebarAdmin';
import "../styles/lihatprofil.css";
import ProfileComponent from "../components/profileComponent";

import { useAuth } from '../components/auth/context/AuthContext';
import { config } from '../Constants'

export default function ProfilePage() {
  const baseUrl = config.url.API_BASE_URL + '/api/';

  // Dummy data for user role, replace it with actual user data
  const Auth = useAuth();
  const user = Auth.getUser();

  // Render Sidebar based on user role
  const renderSidebar = () => {
    if (user.data.role == "Admin") {
      return <SidebarAdmin />;
    } else if (user.data.role == "Karyawan") {
      return <SidebarKaryawan />;
    } else if (user.data.role == "Guru") {
      return <SidebarGuru/>;
    } else if (user.data.role == "Eksekutif") {
      return <SidebarEksekutif/>;
    }
    
  };

  const history = useHistory();

  useEffect(() => {
    // Periksa apakah pengguna telah masuk saat komponen dimuat
    if (user == null) {
        // Jika pengguna tidak masuk, arahkan mereka ke halaman login
        history.push('/login');
    } else {
      // Lakukan scroll ke atas setelah halaman dimuat
      window.scrollTo(0, 0);
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