import React from "react";
import { 
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem } from "cdbreact";
import { NavLink, useHistory } from "react-router-dom";
import "../styles/sidebar.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './auth/context/AuthContext';

const SideBarEksekutif = () => {
  const history = useHistory(); // Initialize history
  const { userLogout } = useAuth(); // Use useAuth hook to access userLogout function

  const handleLogout = () => {
    userLogout(); // Call userLogout function from useAuth hook
    history.push('/login'); // Redirect to login page after logout
  };

  return (
    <div className={`app`}>
      <CDBSidebar
        textColor="#1C1C1C"
        backgroundColor="#FFFFFF"
      >
        <CDBSidebarHeader
          prefix={
            <i className="fa fa-bars fa-large"></i>
          }
        >
          <a className="text-decoration-none style" style={{color:"inherit"}}>
          <span className="brand-text">Purwacaraka</span>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
        <div className="sidebar-section-label">Dashboard</div>
          <CDBSidebarMenu>
            <NavLink exact to="/homepage-eksekutif" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-solid fa-user-graduate" className="sidebar-menu-item">Dashboard</CDBSidebarMenuItem>
            </NavLink>
           
            <hr className="sidebar-divider" />
            <div className="sidebar-section-label">Laporan</div>
            <NavLink exact to="/laporan-transaksi-siswa-eksekutif" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Transaksi Siswa</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/laporan-iuran-siswa-eksekutif" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Iuran</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/laporan-pembayaran-kursus-eksekutif" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Pembayaran Kursus</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/laporan-keuangan-buku-eksekutif" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Keuangan & Stok Buku</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/laporan-gaji-guru-eksekutif" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Gaji Guru</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/laporan-data-siswa-eksekutif" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Data Siswa</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/laporan-daftar-siswa-eksekutif" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Daftar Siswa</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/laporan-buku-eksekutif" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Buku</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
          <CDBSidebarMenu>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px"}}>
            <NavLink to="/profile" className="text-decoration-none" style={{ color: "inherit" }}>
              <FontAwesomeIcon icon={faUser} /> Profile Saya
            </NavLink>
          </div>

          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px"}}>
            <button onClick={handleLogout} className="text-decoration-none" style={{ color: "inherit", border: "none", background: "none", cursor: "pointer" }}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default SideBarEksekutif;