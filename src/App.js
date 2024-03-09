import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LaporanKeuanganBuku from './pages/laporanKeuanganBuku'
import LaporanTransaksiSiswa from './pages/laporanTransaksiSiswa';
import EntryTransaksiSiswa from './pages/entryDataTransaksiSiswa';
import EntryPembelianBuku from './pages/entryPembelianBuku';
import UpdateDataTransaksiSiswa from './pages/updateDataTransaksiSiswa';

function App() {  
  return (
    <Router basename="/silk">
      <Switch>
        <Route path="/laporan-keuangan-buku"><LaporanKeuanganBuku /></Route>
        <Route path="/laporan-transaksi-siswa"><LaporanTransaksiSiswa /></Route>
        <Route path="/entry-transaksi-siswa"><EntryTransaksiSiswa/></Route>
        <Route path="/entry-pembelian-buku"><EntryPembelianBuku/></Route>
        <Route path="/update-transaksi-siswa/:id"><UpdateDataTransaksiSiswa/></Route>
      </Switch>
    </Router>
  );
}

export default App;