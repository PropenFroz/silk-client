import React from "react";
import Sidebar from "../components/sidebarKaryawan";
import "../styles/lihatprofil.css";
import ProfileComponent from "../components/profileComponent";

export default function ProfilePage() {
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  return (
    <div className="dashboard d-flex">
      <Sidebar />
      <div className="dashboard-profile">
        <h2>My Profile</h2>
        <ProfileComponent />
      </div>
    </div>
  );
}
