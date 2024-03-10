export async function deleteEntryTransaksiBuku(transactionId) {
  try {
    const url = `https://silk-purwa.up.railway.app/api/entry-transaksi-buku/delete/${transactionId}`;
    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) {
      console.log("Data berhasil dihapus");
      return true; // Data berhasil dihapus
    } else {
      console.error("Gagal menghapus data");
      return false; // Gagal menghapus data
    }
  } catch (error) {
    console.error("Error:", error);
    return false; // Terjadi kesalahan
  }
}
