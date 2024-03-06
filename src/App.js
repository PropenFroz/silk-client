
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

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import WelcomePage from './pages/welcome'
import TestBE from './pages/be1'
import LaporanTransaksiSiswa from './pages/LaporanTransaksiSiswa';
import EntryTransaksiSiswa from './pages/EntryTransaksiSiswa';

function App() {  
  return (
    <Router basename="/silk">
      <Switch>
        <Route path="/welcome"><WelcomePage /></Route>
        <Route path="/be1"><TestBE /></Route>
        <Route path="/laporan-transaksi-siswa"><LaporanTransaksiSiswa /></Route>
        <Route path="/entry-transaksi-siswa"><EntryTransaksiSiswa/></Route>
      </Switch>
    </Router>
  );
}

export default App;

