import { config } from '../Constants'

const baseUrl = config.url.API_BASE_URL + '/api/';

const updateEntryDataKursus = async (id, formData) => {
    try {
        const response = await fetch(`${baseUrl}entry-transaksi-kursus/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Gagal mengirimkan permintaan update');
        }
    } catch (error) {
        console.error('Error updating entry data:', error);
        throw error;
    }
};

export default updateEntryDataKursus;
