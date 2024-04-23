import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import '../styles/tableLaporan.css';
import Button from './button';

export default function TabelLaporanBuku() {
    const [bukuList, setBukuList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/buku-purwacaraka/all'); 
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setBukuList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="table-wrapper">
            <Table responsive bordered>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Buku</th>
                        <th scope="col">Jurusan</th>
                        <th scope="col">Stok Buku</th>
                    </tr>
                </thead>
                <tbody>
                    {bukuList.map((buku, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{buku.namaBuku}</td>
                            <td>{buku.jurusanKursus ? buku.jurusanKursus.namaJurusan : '-'}</td>
                            <td>{buku.jumlah}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
