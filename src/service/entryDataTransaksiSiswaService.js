const sendEntryData = (formData, setShowModal) => {
    const requestData = {
        jenisTransaksi: formData.jenisTransaksi,
        tanggalPembayaran: new Date(formData.tanggalPembayaran).toISOString(),
        namaSiswa: formData.namaSiswa,
        jurusanKursus: formData.jurusanKursus,
        gradeKursus: formData.gradeKursus,
        uangPendaftaran: formData.uangPendaftaran,
        uangKursus: formData.uangKursus,
        uangBuku: formData.uangBuku,
        cash: formData.cash,
        transfer: formData.transfer,
        keterangan: formData.keterangan
    };

    fetch('https://localhost:8080/api/entry-transaksi-siswa', {
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