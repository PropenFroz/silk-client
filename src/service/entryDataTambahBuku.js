import { config } from '../Constants'

const sendEntryData = (formData, setShowModal) => {
    const requestData = {
        namaBuku: formData.namaBuku,
        jurusanKursus: formData.jurusanKursus,
        stokBuku: formData.stokBuku
    };
    const baseUrl = config.url.API_BASE_URL + '/api/';


    fetch(`${baseUrl}buku-purwacaraka`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(response => {
        if (response.ok) {
            setShowModal(true);
        } else {
            console.error('Gagal mengirim formulir:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Kesalahan jaringan:', error);
    });
};

export default sendEntryData;