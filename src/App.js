import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./components/auth/context/AuthContext";
import DaftarAkun from "./pages/admin/DaftarAkun";
import TambahAkun from "./pages/admin/TambahAkun";
import ProfilePage from "./pages/profilePage";
import LaporanKeuanganBuku from './pages/laporanKeuanganBuku'
import LaporanTransaksiSiswa from './pages/laporanTransaksiSiswa';
import EntryTransaksiSiswa from './pages/entryDataTransaksiSiswa';
import EntryTransaksiSiswaKursus from './pages/entryDataTransaksiSiswaKursus';
import EntryTransaksiSiswaLainnya from './pages/entryDataTransaksiSiswaLainnya';
import EntryPembelianBuku from './pages/entryPembelianBuku';
import UpdateDataTransaksiSiswa from './pages/updateDataTransaksiSiswa';
import UpdateDataKursusSiswa from './pages/updateDataKursusSiswa';
import UpdateDataPembelianBuku from './pages/updatePembelianBuku';
import Homepage from './pages/homepageKaryawan';
import Login from './pages/login';
import SidebarKaryawan from './components/sidebarKaryawan';
import UbahPassword from './pages/ubahPassword';
import EntryGajiGuru from './pages/entryGajiGuru';
import LaporanGajiGuru from './pages/laporanGajiGuru';
import LaporanPembayaranKursus from './pages/laporanPembayaranKursus';
import LaporanIuranSiswa from './pages/laporanIuranSiswa';
import LaporanDaftarSiswa from './pages/laporanDaftarSiswa'
import UpdateDataGajiGuru from './pages/updateDataGajiGuru';
import HomepageGuru from "./pages/homepageGuru";
import HomepageEksekutif from "./pages/homepageEksekutif";

function App() {
  return (
    <AuthProvider>
     <Router basename="/silk">
      <Switch>
        <Route path="/laporan-keuangan-buku"><LaporanKeuanganBuku /></Route>
        <Route path="/laporan-transaksi-siswa"><LaporanTransaksiSiswa /></Route>
        <Route path="/laporan-gaji-guru"><LaporanGajiGuru /></Route>
        <Route path="/laporan-transaksi-siswa"><LaporanTransaksiSiswa /></Route>
        <Route path="/laporan-pembayaran-kursus"><LaporanPembayaranKursus /></Route>
        <Route path="/laporan-iuran-siswa"><LaporanIuranSiswa /></Route>
        <Route path="/entry-transaksi-siswa"><EntryTransaksiSiswa/></Route>
        <Route path="/entry-transaksi-siswa-kursus"><EntryTransaksiSiswaKursus/></Route>
        <Route path="/entry-transaksi-siswa-lainnya"><EntryTransaksiSiswaLainnya/></Route>
        <Route path="/entry-pembelian-buku"><EntryPembelianBuku/></Route>
        <Route path="/entry-gaji-guru"><EntryGajiGuru/></Route>
        <Route path="/update-gaji-guru/:id"><UpdateDataGajiGuru/></Route>
        <Route path="/update-transaksi-siswa/:id"><UpdateDataTransaksiSiswa/></Route>
        <Route path="/update-kursus-siswa/:id"><UpdateDataKursusSiswa/></Route>
        <Route path="/homepage-karyawan"><Homepage/></Route>
        <Route path="/homepage-guru"><HomepageGuru/></Route>
        <Route path="/homepage-eksekutif"><HomepageEksekutif/></Route>
        <Route path="/update-pembelian-buku/:id"><UpdateDataPembelianBuku /></Route>
        <Route path="/sideBarKaryawan"><SidebarKaryawan /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/admin/daftar-akun"><DaftarAkun /></Route>
        <Route path="/admin/tambah-akun"><TambahAkun /></Route>
        <Route path="/profile">< ProfilePage /></Route>
        <Route path="/ubah-password"><UbahPassword /></Route>
        <Route path="/laporan-daftar-siswa">< LaporanDaftarSiswa /></Route>
      </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
