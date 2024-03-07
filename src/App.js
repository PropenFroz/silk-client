// import axios from 'axios';

// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [response, setResponse] = useState('')
//   const [error, setError] = useState('')
//   const url = 'https://silk-purwa.up.railway.app/api/test'
//   axios
//     .get(url)
//     .then((resp) => {
//       setResponse(resp.data)
//     })
//     .catch((err) => {
//       setError(err.toString())
//     })
//   return (
//     <div>
//       <h1>Spring React Testing PROPENFROZ</h1>
//       <hr />
//       {error ? <div>{error}</div> : <div>{response}</div>}
//     </div>
//   )
// }

// export default App

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WelcomePage from "./pages/welcome";
import TestBE from "./pages/be1";
import LaporanKeuanganBuku from "./pages/laporanKeuanganBuku";
import SidebarKaryawan from "./components/sidebarKaryawan";
import MyProfile from "./pages/myProfile";

// import LaporanTransaksi from './pages/laporanTransaksi'
// import EntryTransaksi from './pages/entryTransaksi'

function App() {
  return (
    <Router basename="/silk">
      <Switch>
        <Route path="/welcome">
          <WelcomePage />
        </Route>
        <Route path="/be1">
          <TestBE />
        </Route>
        <Route path="/laporanKeuanganBuku">
          <LaporanKeuanganBuku />
        </Route>
        <Route path="/sideBarKaryawan">
          <SidebarKaryawan />
        </Route>
        <Route path="/lihatProfile">
          <MyProfile />
        </Route>
        {/* <Route path="/laporanTransaksi"><LaporanTransaksi /></Route>
        <Route path="/entryTransaksi"><EntryTransaksi /></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
