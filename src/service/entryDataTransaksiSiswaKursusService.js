const sendEntryData = (formData, setShowModal) => {
    const requestData = {
        jenisTransaksi: formData.jenisTransaksi,
        tahunKursus: formData.tahunKursus,
        tanggalPembayaran: new Date(formData.tanggalPembayaran).toISOString(),
        siswa: formData.siswa,
        uangPendaftaran: formData.uangPendaftaran,
        uangKursus: formData.uangKursus,
        uangBuku: formData.uangBuku,
        cash: formData.cash,
        transfer: formData.transfer,
        keterangan: formData.keterangan
    };

    fetch('http://localhost:8080/api/entry-transaksi-siswa-kursus', {
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