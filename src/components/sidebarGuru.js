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

const SideBarGuru = () => {
  const history = useHistory();
  const { userLogout } = useAuth();

  const handleLogout = () => {
    userLogout();
    history.push('/login');
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
          <a href="/" className="text-decoration-none style" style={{color:"inherit"}}>
          <span className="brand-text">Purwacaraka</span>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
        <div className="sidebar-section-label">Laporan</div>
          <CDBSidebarMenu>
            <NavLink exact to="/homepage-guru" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-solid fa-user-graduate" className="sidebar-menu-item">Gaji Guru</CDBSidebarMenuItem>
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

export default SideBarGuru;