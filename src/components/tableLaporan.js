// tableLaporan.js

import React from 'react';
import { Table } from 'react-bootstrap';
import '../styles/tableLaporan.css';
import Button from './button'; // Import Button component

export default function TableLaporan() {
    return (
        <div className="table-wrapper">
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Buku</th>
                        <th scope="col">Jurusan</th>
                        <th scope="col">Jumlah</th>
                        <th scope="col">Tanggal Beli</th>
                        <th scope="col">Jumlah Beli</th>
                        <th scope="col">Tanggal Jual</th>
                        <th scope="col">Jumlah Jual</th>
                        <th scope="col">Sisa</th>
                        <th scope="col">Harga Beli</th>
                        <th scope="col">Harga Jual</th>
                        <th scope="col">Keuntungan</th>
                        <th scope="col">Total Keuntungan</th>
                        <th scope="col">Total Penjualan</th>
                        <th scope="col">Saldo</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Keyboard A & Piano Pop 1A</td>
                        <td>Keyboard</td>
                        <td>5</td>
                        <td>19/12/13</td>
                        <td>5</td>
                        <td>19/12/13</td>
                        <td>3</td>
                        <td>7</td>
                        <td>Rp60.000</td>
                        <td>Rp90.000</td>
                        <td>Rp1.000.000</td>
                        <td>Rp90.000</td>
                        <td>Rp1.000.000</td>
                        <td>Rp1.000.000</td>
                        <td>
                            <Button className="btn-update">Update</Button> {/* Gunakan komponen tombol */}
                            <Button className="btn-delete">Delete</Button> {/* Gunakan komponen tombol */}
                        </td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </Table>
        </div>
    )
}
