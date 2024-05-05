import React from 'react';
import { Table } from 'react-bootstrap';
import '../styles/tableLaporan.css';

function TableLaporanDataSiswa({ laporanDataSiswa }) {
    return (
        <div className="table-wrapper">
            <Table responsive bordered>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Bulan</th>
                        <th scope="col">Siswa Baru</th>
                        <th scope="col">Siswa Cuti</th>
                        <th scope="col">Siswa Cuti Masuk Kembali</th>
                        <th scope="col">Siswa Off</th>
                        <th scope="col">Total Siswa Aktif</th>
                    </tr>
                </thead>
                <tbody>
                    {laporanDataSiswa.map((laporan, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{laporan.bulan}</td>
                            <td>{laporan.jumlahSiswaBaru}</td>
                            <td>{laporan.jumlahSiswaCuti}</td>
                            <td>{laporan.jumlahSiswaCutiMasukKembali}</td>
                            <td>{laporan.jumlahSiswaOff}</td>
                            <td>{laporan.jumlahTotalSiswaAktif}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TableLaporanDataSiswa;
