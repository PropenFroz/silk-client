import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; //
import Sidebar from '../components/sidebarKaryawan';
import '../styles/laporan.css';
import TableLaporan from '../components/tableLaporanDaftarSiswa';
import Button from '../components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { fetchJurusanKursus } from "../service/fetchDataService"; 
import Select from 'react-select'; 

export default function LaporanTransaksi() {
    const [jurusanKursus, setJurusanKursus] = useState([]);
    const [selectedJurusan, setSelectedJurusan] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const Auth = useAuth();
    const user = Auth.getUser();
    const history = useHistory();

    useEffect(() => {
        // Periksa apakah pengguna telah masuk saat komponen dimuat
        if (user == null) {
            // Jika pengguna tidak masuk, arahkan mereka ke halaman login
            history.push('/login');
        }
    }, [user, history]); // Tambahkan user dan history ke dependency array agar useEffect dipanggil ulang saat mereka berubah


    useEffect(() => {
        fetchJurusanKursus()
            .then(data => {
                setJurusanKursus(data.map(jurusan => ({ value: jurusan.idJurusanKursus, label: jurusan.namaJurusan })));
            })
            .catch(error => console.error('Error fetching jurusanKursus:', error));

        // Panggil handleView saat komponen dimuat pertama kali
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
            const response = await fetch(`http://localhost:8080/api/siswa/by-jurusan/${jurusanId}`);
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
            const response = await fetch('http://localhost:8080/api/siswa/all');
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
                <TableLaporan transactions={transactions} selectedJurusan={selectedJurusan} jurusanKursus={jurusanKursus} />
            </div>
        </div>
    )
}
