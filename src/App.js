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
import LaporanBuku from "./pages/laporanBuku";
import LaporanBukuEksekutif from "./pages/laporanBukuEksekutif";
import EntryTambahBuku from "./pages/entrytambahBuku";
import LaporanTransaksiEksekutif from "./pages/laporanTransaksiSiswaEksekutif";
import LaporanIuranSiswaEksekutif from "./pages/laporanIuranSiswaEksekutif";
import LaporanPembayaranKursusEksekutif from "./pages/laporanPembayaranKursusEksekutif";
import LaporanKeuanganBukuEksekutif from "./pages/laporanKeuanganBukuEksekutif";
import LaporanGajiGuruEksekutif from "./pages/laporanGajiGuruEksekutif";
import LaporanDaftarSiswaEksekutif from "./pages/laporanDaftarSiswaEksekutif";
import LaporanDataSiswa from "./pages/laporanDataSiswa";
import LaporanDataSiswaEksekutif from "./pages/laporanDataSiswaEksekutif";

function App() {
  return (
    <AuthProvider>
     <Router basename="/silk">
      <Switch>
        <Route path="/laporan-keuangan-buku"><LaporanKeuanganBuku /></Route>
        <Route path="/laporan-keuangan-buku-eksekutif"><LaporanKeuanganBukuEksekutif /></Route>
        <Route path="/laporan-transaksi-siswa"><LaporanTransaksiSiswa /></Route>
        <Route path="/laporan-transaksi-siswa-eksekutif"><LaporanTransaksiEksekutif /></Route>
        <Route path="/laporan-gaji-guru"><LaporanGajiGuru /></Route>
        <Route path="/laporan-gaji-guru-eksekutif"><LaporanGajiGuruEksekutif /></Route>
        <Route path="/laporan-transaksi-siswa"><LaporanTransaksiSiswa /></Route>
        <Route path="/laporan-pembayaran-kursus"><LaporanPembayaranKursus /></Route>
        <Route path="/laporan-pembayaran-kursus-eksekutif"><LaporanPembayaranKursusEksekutif /></Route>
        <Route path="/laporan-iuran-siswa"><LaporanIuranSiswa /></Route>
        <Route path="/laporan-iuran-siswa-eksekutif"><LaporanIuranSiswaEksekutif /></Route>
        <Route path="/entry-transaksi-siswa"><EntryTransaksiSiswa/></Route>
        <Route path="/entry-transaksi-siswa-kursus"><EntryTransaksiSiswaKursus/></Route>
        <Route path="/entry-transaksi-siswa-lainnya"><EntryTransaksiSiswaLainnya/></Route>
        <Route path="/entry-pembelian-buku"><EntryPembelianBuku/></Route>
        <Route path="/entry-gaji-guru"><EntryGajiGuru/></Route>
        <Route path="/entry-tambah-buku"><EntryTambahBuku/></Route>
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
        <Route path="/laporan-daftar-siswa-eksekutif"><LaporanDaftarSiswaEksekutif /></Route>
        <Route path="/laporan-data-siswa"><LaporanDataSiswa /></Route>
        <Route path="/laporan-data-siswa-eksekutif"><LaporanDataSiswaEksekutif /></Route>
        <Route path="/laporan-buku"><LaporanBuku /></Route>
        <Route path="/laporan-buku-eksekutif"><LaporanBukuEksekutif /></Route>
      </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
