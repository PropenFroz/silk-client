import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; //
import Sidebar from '../components/sidebarEksekutif';
import '../styles/laporan.css';
import TableLaporan from '../components/tableLaporanDaftarSiswaEksekutif';
import Button from '../components/button';
import { fetchJurusanKursus } from "../service/fetchDataService"; 
import Select from 'react-select'; 

import { config } from '../Constants'


export default function LaporanDaftarSiswaEksekutif() {
    const baseUrl = config.url.API_BASE_URL + '/api/';

    const [jurusanKursus, setJurusanKursus] = useState([]);
    const [selectedJurusan, setSelectedJurusan] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const Auth = useAuth();
    const user = Auth.getUser();
    const history = useHistory();

    useEffect(() => {
        if (user == null) {
            history.push('/login');
        } else {
            // Lakukan scroll ke atas setelah halaman dimuat
            window.scrollTo(0, 0);
        }
    }, [user, history]);


    useEffect(() => {
        fetchJurusanKursus()
            .then(data => {
                setJurusanKursus(data.map(jurusan => ({ value: jurusan.idJurusanKursus, label: jurusan.namaJurusan })));
            })
            .catch(error => console.error('Error fetching jurusanKursus:', error));
        handleView(); 
    }, []);


    const handleView = async () => {
        try {
            let siswaData;
            if (selectedJurusan) {
                siswaData = await getAllSiswaByJurusan(selectedJurusan.value);
            } else {
                siswaData = await getAllSiswa();
            }
            setTransactions(siswaData);
        } catch (error) {
            console.error('Error fetching siswa data:', error);
        }
    };

    const getAllSiswaByJurusan = async (jurusanId) => {
        try {
            const response = await fetch(`${baseUrl}siswa/by-jurusan/${jurusanId}`);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching data:', error);
        }
    };
    
    const getAllSiswa = async () => {
        try {
            const response = await fetch(`${baseUrl}siswa/all`);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching data:', error);
        }
    };

    return (
        <div className="dashboard d-flex">
            <div>
                <Sidebar/>
            </div>
            <div className="dashboard-content">
                <h2>Laporan Daftar Siswa</h2>
                <div className="button-group">
                    <div className="left-buttons">
                        <div className="input-field" style={{marginRight: '10px'}}>
        
                            <Select
                                options={jurusanKursus}
                                value={selectedJurusan}
                                onChange={setSelectedJurusan}
                                placeholder="Pilih Jurusan"
                            />
                        </div>

                        <Button className="button" onClick={handleView}>
                            <div className="button-base-2">
                                <div className="text-13">Tampilkan</div>
                            </div>
                        </Button>
                    </div>
    
                </div>
                <TableLaporan transactions={transactions} />
            </div>
        </div>
    )
}
