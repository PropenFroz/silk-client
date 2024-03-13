const sendEntryData = (formData, setShowModal, id) => {
  const requestData = {
    bukuPurwacaraka: formData.bukuPurwacaraka,
    jurusanKursus: formData.bukuPurwacaraka.jurusanKursus,
    tanggalBeli: new Date(formData.tanggalBeli).toISOString(),
    jumlahBeli: formData.jumlahBeli,
    tanggalJual: new Date(formData.tanggalJual).toISOString(),
    jumlahJual: formData.jumlahJual,
    hargaBeli: formData.hargaBeli,
    hargaJual: formData.hargaJual,
  };

  fetch(`https://silk-purwa.up.railway.app/api/entry-transaksi-buku/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        setShowModal(true);
      } else {
        console.error("Gagal mengirim formulir:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Kesalahan jaringan:", error);
    });
};

export default sendEntryData;
