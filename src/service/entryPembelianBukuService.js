import { config } from '../Constants'

const sendEntryData = (formData, setShowModal) => {
    const requestData = {
        bukuPurwacaraka: formData.bukuPurwacaraka,
        jurusanKursus: formData.jurusanKursus,
        tanggalBeli: new Date(formData.tanggalBeli).toISOString(),
        jumlahBeli: formData.jumlahBeli,
        tanggalJual: new Date(formData.tanggalJual).toISOString(),
        jumlahJual: formData.jumlahJual,
        hargaBeli: formData.hargaBeli,
        hargaJual: formData.hargaJual,

    };
    const baseUrl = config.url.API_BASE_URL + '/api/';


    fetch(`${baseUrl}entry-transaksi-buku`, {
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