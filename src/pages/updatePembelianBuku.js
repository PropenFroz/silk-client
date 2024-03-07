import React from "react";
import UpdatePembelianBuku from "../components/updatePembelianBuku";
import "../styles/laporan.css";
import SideBarKaryawan from "../components/sidebarKaryawan";

export default function updatePembelianBuku() {
  return (
    <div className="dashboard d-flex">
      <SideBarKaryawan />
      <div className="dashboard-content">
        <h2>Update Data Pembelian Buku</h2>
        <UpdatePembelianBuku />
      </div>
    </div>
  );
}
