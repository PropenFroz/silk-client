import React from 'react';
import { Table } from 'react-bootstrap';
import '../styles/tableLaporan.css';

export default function TabelLaporanIuranSiswaEksekutif({ transactions }) {

    const siswaMap = {};
    transactions.forEach(transaction => {
        const { siswa, bulan, entryKursus } = transaction;
        const { namaSiswa, tanggalDaftar } = siswa;

        if (!siswaMap[namaSiswa]) {
            siswaMap[namaSiswa] = {
                namaSiswa: namaSiswa,
                tanggalDaftar: new Date(tanggalDaftar).toLocaleDateString('id-ID'),
                iuran: {}
            };
        }

        siswaMap[namaSiswa].iuran[bulan] = entryKursus ? {
            idEntryTransaksiSiswa: entryKursus.idEntryTransaksiSiswa,
            tanggalPembayaran: new Date(entryKursus.tanggalPembayaran).toLocaleDateString('id-ID')
        } : null;
    });

    const rows = Object.values(siswaMap).map((siswa, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{siswa.namaSiswa}</td>
            <td>{siswa.tanggalDaftar}</td>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(bulan => (
                <td key={bulan}>
                    {siswa.iuran[bulan] ? 
                        <div>
                            <span>{siswa.iuran[bulan].tanggalPembayaran}</span>
                        </div> 
                        : '-'}
                </td>
            ))}
        </tr>
    ));

    if (!transactions) {
        return <div>Mohon Pilih Jurusan dan Tahun Terlebih Dahulu!</div>;
    }

    if (transactions.length === 0) {
        return <div>Mohon Pilih Jurusan dan Tahun Terlebih Dahulu!</div>;
    }

    return (
        <div className="table-wrapper">
            <Table responsive bordered>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Tanggal Daftar</th>
                        <th scope="col">Januari</th>
                        <th scope="col">Februari</th>
                        <th scope="col">Maret</th>
                        <th scope="col">April</th>
                        <th scope="col">Mei</th>
                        <th scope="col">Juni</th>
                        <th scope="col">Juli</th>
                        <th scope="col">Agustus</th>
                        <th scope="col">September</th>
                        <th scope="col">Oktober</th>
                        <th scope="col">November</th>
                        <th scope="col">Desember</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    );
}