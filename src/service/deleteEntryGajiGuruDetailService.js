export async function deleteEntryGajiGuruDetail(transactionId) {
    try {
        const url = `http://localhost:8080/api/entry-gaji-guru-detail/delete/${parseInt(transactionId)}`;
        console.log("url", url)
        const response = await fetch(url, { method: 'DELETE' });
        if (response.ok) {
            console.log('Data berhasil dihapus');
            return true;
        } else {
            console.error('Gagal menghapus data');
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
