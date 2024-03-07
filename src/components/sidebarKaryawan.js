import React from "react";
import { 
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem } from "cdbreact";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const SideBarKaryawan = () => {

  return (
    <div
      className={`app`}
      style={{ display: "flex",}}
    >
      <CDBSidebar
        textColor="#1C1C1C"
        backgroundColor="#FFFFFF"
        style={{ height: "100vh" }}
      >
        <CDBSidebarHeader
          prefix={
            <i className="fa fa-bars fa-large"></i>
          }
        >
          <a href="/" className="text-decoration-none style" style={{color:"inherit"}}>
          <span className="brand-text">Purwacaraka</span>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
        <div className="sidebar-section-label">Input Data</div>
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-solid fa-user-graduate" className="sidebar-menu-item">Transaksi Siswa</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-solid fa-book" className="sidebar-menu-item">Pembelian Buku</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-solid fa-wallet" className="sidebar-menu-item">Gaji Guru</CDBSidebarMenuItem>
            </NavLink>
           
            <hr className="sidebar-divider" />
            <div className="sidebar-section-label">Laporan</div>
            <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Transaksi</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Iuran</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Pembayaran Kursus</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Keuangan & Stok Buku</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Gaji Guru</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Data Murid</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-regular fa-clipboard" className="sidebar-menu-item">Daftar Murid</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
          <CDBSidebarMenu>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          {/* Profile button with icon */}
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px"}}>
            <NavLink to="/profile" className="text-decoration-none" style={{ color: "inherit" }}>
              <FontAwesomeIcon icon={faUser} /> Profile Saya
            </NavLink>
          </div>

          {/* Logout button with icon */}
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px"}}>
            <NavLink to="/logout" className="text-decoration-none" style={{ color: "inherit" }}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </NavLink>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default SideBarKaryawan;