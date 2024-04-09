
export async function deleteEntryTransaksiSiswa(transactionId) {
    try {
        const url = `http://localhost:8080/api/entry-transaksi-siswa/delete/${transactionId}`;
        const response = await fetch(url, { method: 'DELETE' });
        if (response.ok) {
            console.log('Data berhasil dihapus');
            return true; // Data berhasil dihapus
        } else {
            console.error('Gagal menghapus data');
            return false; // Gagal menghapus data
        }
    } catch (error) {
        console.error('Error:', error);
        return false; // Terjadi kesalahan
    }
}
