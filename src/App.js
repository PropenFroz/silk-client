import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LaporanKeuanganBuku from "./pages/laporanKeuanganBuku";
import ProfilePage from "./pages/profilePage";
import UpdateDataPembelianBuku from "./pages/updatePembelianBuku";
// import EntryPembelianBuku from "./pages/entryPembelianBuku";

function App() {
  return (
    <Router basename="/silk">
      <Switch>
        <Route path="/laporan-keuangan-buku">
          <LaporanKeuanganBuku />
        </Route>
        <Route path="/lihatProfile">
          <ProfilePage />
        </Route>
        <Route path="/update-pembelian-buku/:id">
          <UpdateDataPembelianBuku />
        </Route>

        {/* <Route path="/entry-pembelian-buku">
          <EntryPembelianBuku />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
