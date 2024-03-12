import React from "react";
import UpdatePembelianBuku from "../components/updatePembelianBuku";
import { useParams } from "react-router-dom";
import "../styles/laporan.css";
import SideBarKaryawan from "../components/sidebarKaryawan";

export default function UpdateDataPembelianBuku() {
  const { id } = useParams(); // Ambil parameter ID dari URL menggunakan useParams

  return (
    <div className="dashboard d-flex">
      <SideBarKaryawan />
      <div className="dashboard-laporan">
        <h2>Update Pembelian Buku</h2>
        <UpdatePembelianBuku id={id} />
      </div>
    </div>
  );
}
