import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { AuthProvider } from './components/auth/context/AuthContext';
import DaftarAkun from './pages/admin/DaftarAkun';
import TambahAkun from './pages/admin/TambahAkun';
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
        <Route path="/entry-transaksi-siswa"><EntryTransaksiSiswa/></Route>
        <Route path="/entry-transaksi-siswa-kursus"><EntryTransaksiSiswaKursus/></Route>
        <Route path="/entry-transaksi-siswa-lainnya"><EntryTransaksiSiswaLainnya/></Route>
        <Route path="/entry-pembelian-buku"><EntryPembelianBuku/></Route>
        <Route path="/entry-gaji-guru"><EntryGajiGuru/></Route>
        <Route path="/update-transaksi-siswa/:id"><UpdateDataTransaksiSiswa/></Route>
        <Route path="/update-kursus-siswa/:id"><UpdateDataKursusSiswa/></Route>
        <Route path="/homepage-karyawan"><Homepage/></Route>
        <Route path="/update-pembelian-buku/:id"><UpdateDataPembelianBuku /></Route>
        <Route path="/sideBarKaryawan"><SidebarKaryawan /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/admin/daftar-akun"><DaftarAkun /></Route>
        <Route path="/admin/tambah-akun"><TambahAkun /></Route>
        <Route path="/profile">< ProfilePage /></Route>
        <Route path="/ubah-password"><UbahPassword /></Route>
      </Switch>
      </Router>
        </AuthProvider>
  );
}

export default App;
