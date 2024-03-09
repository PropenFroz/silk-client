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
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Menggunakan hanya icon faUser

const SideBarAdmin = () => {
  return (
    <div className={`app`} style={{ display: "flex",}}>
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
          {/* Hapus beberapa menu yang tidak diperlukan */}
          <CDBSidebarMenu>
            <NavLink exact to="/admin/daftarAkun" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-solid fa-user-graduate" className="sidebar-menu-item">Daftar Akun</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/tambahAkun" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-solid fa-book" className="sidebar-menu-item">Tambah Akun</CDBSidebarMenuItem>
            </NavLink>
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
              <FontAwesomeIcon icon={faUser} /> Logout
            </NavLink>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default SideBarAdmin;
