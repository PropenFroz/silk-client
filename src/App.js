import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { AuthProvider } from './components/auth/context/AuthContext';
import DaftarAkun from './pages/admin/DaftarAkun';
import TambahAkun from './pages/admin/TambahAkun';
import ProfilePage from "./pages/profilePage";
import LaporanKeuanganBuku from './pages/laporanKeuanganBuku'
import LaporanTransaksiSiswa from './pages/laporanTransaksiSiswa';
import EntryTransaksiSiswa from './pages/entryDataTransaksiSiswa';
import EntryPembelianBuku from './pages/entryPembelianBuku';
import UpdateDataTransaksiSiswa from './pages/updateDataTransaksiSiswa';
import UpdateDataPembelianBuku from './pages/updatePembelianBuku';
import Homepage from './pages/homepageKaryawan';
import Login from './pages/login';
import SidebarKaryawan from './components/sidebarKaryawan';
import Login1 from './pages/logincopy';

function App() {  
  return (
    <AuthProvider>
     <Router basename="/silk">
      <Switch>
        <Route path="/laporan-keuangan-buku"><LaporanKeuanganBuku /></Route>
        <Route path="/laporan-transaksi-siswa"><LaporanTransaksiSiswa /></Route>
        <Route path="/entry-transaksi-siswa"><EntryTransaksiSiswa/></Route>
        <Route path="/entry-pembelian-buku"><EntryPembelianBuku/></Route>
        <Route path="/update-transaksi-siswa/:id"><UpdateDataTransaksiSiswa/></Route>
        <Route path="/homepage-karyawan"><Homepage/></Route>
        <Route path="/update-pembelian-buku/:id"><UpdateDataPembelianBuku /></Route>
        <Route path="/laporanKeuanganBuku"><LaporanKeuanganBuku /></Route>
        <Route path="/sideBarKaryawan"><SidebarKaryawan /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/admin/daftar-akun"><DaftarAkun /></Route>
        <Route path="/admin/tambah-akun"><TambahAkun /></Route>
        <Route path="/profile">< ProfilePage /></Route>
        <Route path="/logincopy"><Login1 /></Route>
      </Switch>
      </Router>
        </AuthProvider>
  );
}

export default App;
