import React from "react";
import { useParams } from 'react-router-dom';
import UpdatePembelianBuku from "../components/updatePembelianBuku";
import "../styles/laporan.css";
import SideBarKaryawan from "../components/sidebarKaryawan";

export default function UpdatePembelianBukuPage() {
  const { idTransaksi } = useParams();

  return (
    <div className="dashboard d-flex">
      <SideBarKaryawan />
      <div className="dashboard-content">
        <h2>Update Data Pembelian Buku</h2>
        <UpdatePembelianBuku idTransaksi={idTransaksi} />
      </div>
    </div>
  );
}