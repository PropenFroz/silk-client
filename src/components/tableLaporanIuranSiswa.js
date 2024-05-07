import React, {useState} from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DeleteConfirmationModal from './deleteModalLaporanTransaksiSiswa';
import { deleteEntryTransaksiSiswa } from '../service/deleteDataTransaksiSiswaService';
import '../styles/tableLaporan.css';
import { config } from "../Constants"

export default function TabelLaporanIuranSiswa({ transactions, setTransactions, selectedJurusan, tahun }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    const history = useHistory();
    const baseUrl = config.url.API_BASE_URL + '/api/';

    const handleUpdate = (transactionId) => {
        history.push(`/update-kursus-siswa/${transactionId}`);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleShowDeleteModal = (transactionId) => {
        setSelectedTransactionId(transactionId);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            const isDeleted = await deleteEntryTransaksiSiswa(selectedTransactionId);
            if (isDeleted) {
                const updatedTransactions = await fetchData(selectedJurusan.value, tahun);
                setTransactions(updatedTransactions);
                setShowDeleteModal(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchData = async (jurusan, tahun) => {
        try {
            const url = `${baseUrl}iuran-siswa/filter?idJurusanKursus=${jurusan}&tahun=${tahun}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

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
                            <Button className="btn-update-iuran" onClick={() => handleUpdate(siswa.iuran[bulan].idEntryTransaksiSiswa)}>
                                Update
                            </Button>
                            <Button className="btn-delete-iuran"  onClick={() => handleShowDeleteModal(siswa.iuran[bulan].idEntryTransaksiSiswa)}>
                                Delete
                            </Button>
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
            <DeleteConfirmationModal 
                show={showDeleteModal} 
                handleClose={handleCloseDeleteModal} 
                handleDelete={handleDelete} 
            />
        </div>
    );
}