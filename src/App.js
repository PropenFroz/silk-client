import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import WelcomePage from './pages/welcome'
import TestBE from './pages/be1'
import LaporanKeuanganBuku from './pages/laporanKeuanganBuku'
import Login from './pages/login';
import SidebarKaryawan from './components/sidebarKaryawan';

// import LaporanTransaksi from './pages/laporanTransaksi'
// import EntryTransaksi from './pages/entryTransaksi'


function App() {  
  return (
    <Router basename="/silk">
      <Switch>
        <Route path="/welcome"><WelcomePage /></Route>
        <Route path="/be1"><TestBE /></Route>
        <Route path="/laporanKeuanganBuku"><LaporanKeuanganBuku /></Route>
        <Route path="/sideBarKaryawan"><SidebarKaryawan /></Route>
        <Route path="/login"><Login /></Route>
        {/* <Route path="/laporanTransaksi"><LaporanTransaksi /></Route>
        <Route path="/entryTransaksi"><EntryTransaksi /></Route> */}
      </Switch>
    </Router>
  );
}

export default App;

