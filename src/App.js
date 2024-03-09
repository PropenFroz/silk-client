import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LaporanKeuanganBuku from "./pages/laporanKeuanganBuku";
// import LaporanTransaksiSiswa from "./pages/laporanTransaksiSiswa";
// import EntryTransaksiSiswa from "./pages/entryDataTransaksiSiswa";
// import EntryPembelianBuku from "./pages/entryPembelianBuku";
// import UpdateDataTransaksiSiswa from "./pages/updateDataTransaksiSiswa";
import UpdateDataPembelianBuku from "./pages/updatePembelianBuku";
import ProfilePage from "./pages/profilePage";
// import Homepage from "./pages/homepageKaryawan";

function App() {
  return (
    <Router basename="/silk">
      <Switch>
        <Route path="/laporan-keuangan-buku">
          <LaporanKeuanganBuku />
        </Route>
        {/* <Route path="/laporan-transaksi-siswa">
          <LaporanTransaksiSiswa />
        </Route>
        <Route path="/entry-transaksi-siswa">
          <EntryTransaksiSiswa />
        </Route>
        <Route path="/entry-pembelian-buku">
          <EntryPembelianBuku />
        </Route> */}
        {/* <Route path="/update-transaksi-siswa/:id">
          <UpdateDataTransaksiSiswa />
        </Route> */}
        {/* <Route path="/homepage-karyawan">
          <Homepage />
        </Route> */}
        <Route path="/update-pembelian-buku/:id">
          <UpdateDataPembelianBuku />
        </Route>
        <Route path="/lihat-profile">
          <ProfilePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
