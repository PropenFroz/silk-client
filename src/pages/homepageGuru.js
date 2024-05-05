import React, { useState, useEffect } from 'react';
import SideBarGuru from '../components/sidebarGuru';
import CustomDatePicker from "../components/datePicker";
import Button from "../components/button";
import { fetchGuruByUserId } from "../service/fetchDataService";
import '../styles/homepage.css';
import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom';
import { config } from '../Constants'
import RincianGajiGuru from '../components/rincianGajiGuru';

export default function HomepageGuru() {
    const baseUrl = config.url.API_BASE_URL + '/api/';

    const Auth = useAuth();
    const user = Auth.getUser();

    const history = useHistory();
    const [isGuru, setIsGuru] = useState(true);
    const [guru, setGuru] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (user != null) {
            setIsGuru(user.data.role[0] === 'Guru');
        }
        fetchGuruByUserId(user.data.userId)
            .then((data) => {
                setGuru(data);
            })
            .catch((error) => console.error("Error fetching guru:", error));
    }, []);

    if (user == null) {
        history.push('/login');
        return null;
    }
    if (!isGuru) {
        history.push('/login');
        return null;
    }
    
    const handleView = async () => {
        if (!startDate || !endDate) {
          alert("Mohon isi kedua tanggal terlebih dahulu.");
          return;
        } else if (startDate > endDate) {
          alert("Tanggal mulai harus sebelum tanggal akhir.");
          return;
        } else {
          try {
            const formattedStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];
            const formattedEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];
            const url = `${baseUrl}entry-gaji-guru/filter?idGuru=${parseInt(guru.idGuru)}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
            const response = await fetch(url);
            const data = await response.json();
            setTransactions(data);
            console.log(transactions);
            setStartDate(startDate);
            setEndDate(endDate);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    };

    return (
        <div className="dashboard d-flex">
            <SideBarGuru/>
            <div className="dashboard-content">
                <h2>Laporan Gaji Guru</h2>
                <p>Nama: {guru.namaGuru}</p>
                <div className="left-buttons">
                    <CustomDatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholder="Tanggal Awal" />
                    <CustomDatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholder="Tanggal Akhir" />
                    <Button className="button">
                    <div className="button-base-2">
                        <div className="text-13" onClick={handleView}>
                        Tampilkan
                        </div>
                    </div>
                    </Button>
                </div>
                <RincianGajiGuru transactions={transactions}/>
            </div>
        </div>
    )
}