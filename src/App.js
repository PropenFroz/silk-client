import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { AuthProvider } from './components/auth/context/AuthContext';
import DaftarAkun from './pages/admin/DaftarAkun';
import TambahAkun from './pages/admin/TambahAkun';
import ProfilePage from "./pages/profilePage";

import LaporanKeuanganBuku from './pages/laporanKeuanganBuku'
import Login from './pages/login';
import SidebarKaryawan from './components/sidebarKaryawan';
import Login1 from './pages/logincopy';


function App() {  
  return (
    <AuthProvider>
     <Router basename="/silk">
      <Switch>
        <Route path="/laporanKeuanganBuku"><LaporanKeuanganBuku /></Route>
        <Route path="/sideBarKaryawan"><SidebarKaryawan /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/admin/daftarAkun"><DaftarAkun /></Route>
        <Route path="/admin/tambahAkun"><TambahAkun /></Route>
        <Route path="/profile">< ProfilePage /></Route>

        <Route path="/logincopy"><Login1 /></Route>

        {/* <Route path="/laporanTransaksi"><LaporanTransaksi /></Route>
        <Route path="/entryTransaksi"><EntryTransaksi /></Route> */}
      </Switch>
      </Router>
        </AuthProvider>
  );
}

export default App;

