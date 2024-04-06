const updateEntryData = async (id, formData) => {
    try {
        const response = await fetch(`https://localhost:8080/api/entry-transaksi-siswa/update/${id}`, {
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

export default updateEntryData;
