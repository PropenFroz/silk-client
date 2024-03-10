import React, { useState } from "react";
import Sidebar from "../components/sidebarKaryawan";
import "../styles/lihatprofil.css";
import ProfileComponent from "../components/profileComponent"; // Correct import path
import Button from "../components/button";
import CustomDatePicker from "../components/datePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  return (
    <div className="dashboard d-flex">
      <div>
        <Sidebar />
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