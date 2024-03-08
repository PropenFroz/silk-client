import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LaporanKeuanganBuku from "./pages/laporanKeuanganBuku";
import MyProfile from "./pages/myProfile";
import UpdatePembelianBuku from "./components/updatePembelianBuku";
// import EntryPembelianBuku from "./pages/entryPembelianBuku";

function App() {
  return (
    <Router basename="/silk">
      <Switch>
        <Route path="/laporan-keuangan-buku">
          <LaporanKeuanganBuku />
        </Route>
        <Route path="/lihatProfile">
          <MyProfile />
        </Route>
        <Route path="/entry-transaksi-buku/update/:id" component={UpdatePembelianBuku} />
        {/* <Route path="/entry-pembelian-buku">
          <EntryPembelianBuku />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
