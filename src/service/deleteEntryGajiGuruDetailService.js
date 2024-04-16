import { config } from '../Constants'

export async function deleteEntryGajiGuruDetail(transactionId) {
    try {
        const baseUrl = config.url.API_BASE_URL + '/api/';

        const url = `${baseUrl}entry-gaji-guru-detail/delete/${parseInt(transactionId)}`;
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
