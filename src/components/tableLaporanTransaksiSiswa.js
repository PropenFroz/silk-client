import React from 'react';
import { Table } from 'react-bootstrap';
import '../styles/tableLaporan.css';
import Button from './button';

export default function TabelLaporanTransaksiSiswa() {
    return (
        <div className="table-wrapper">
            <Table responsive bordered>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Tanggal Bayar</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Jurusan</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Uang Pendaftaran</th>
                        <th scope="col">Uang Kursus</th>
                        <th scope="col">Uang Buku</th>
                        <th scope="col">Cash</th>
                        <th scope="col">Transfer</th>
                        <th scope="col">Jumlah</th>
                        <th scope="col">Keterangan</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>19/12/13</td>
                        <td>Abdillah Sulthan</td>
                        <td>G(1)</td>
                        <td>G(1)</td>
                        <td>Rp300.000</td>
                        <td>Rp300.000</td>
                        <td>Rp100.000</td>
                        <td>Rp300.000</td>
                        <td>0</td>
                        <td>Rp400.000</td>
                        <td>Cuti 3 Bulan</td>
                        <td>
                            <Button className="btn-update">Update</Button> {/* Gunakan komponen tombol */}
                            <Button className="btn-delete">Delete</Button> {/* Gunakan komponen tombol */}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="5">Total</td>
                        <td>Rp300.000</td>
                        <td>Rp300.000</td>
                        <td>Rp100.000</td>
                        <td>Rp300.000</td>
                        <td>Rp0</td>
                        <td>Rp400.000</td>
                    </tr>
                   
                </tbody>
            </Table>
        </div>
    )
}