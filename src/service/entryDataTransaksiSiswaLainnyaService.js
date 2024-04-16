import { config } from '../Constants'

const sendEntryData = (formData, setShowModal) => {
    const requestData = {
        jenisTransaksi: formData.jenisTransaksi,
        tanggalPembayaran: new Date(formData.tanggalPembayaran).toISOString(),
        siswa: formData.siswa,
        uangPendaftaran: formData.uangPendaftaran,
        uangKursus: formData.uangKursus,
        uangBuku: formData.uangBuku,
        cash: formData.cash,
        transfer: formData.transfer,
        keterangan: formData.keterangan
    };
    const baseUrl = config.url.API_BASE_URL + '/api/';


    fetch(`${baseUrl}entry-transaksi-siswa-lainnya`, {
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