export async function fetchGradeKursus() {
    try {
        const response = await fetch('https://silk-purwa.up.railway.app/api/grade-kursus/all');
        if (!response.ok) {
            throw new Error('Failed to fetch grades');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching grades:', error);
        throw error;
    }
}

export async function fetchJurusanKursus() {
    try {
        const response = await fetch('https://silk-purwa.up.railway.app/api/jurusan-kursus/all');
        if (!response.ok) {
            throw new Error('Failed to fetch jurusanKursus');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching jurusanKursus:', error);
        throw error;
    }
}

export async function fetchBukuPurwacaraka() {
    try {
        const response = await fetch('https://silk-purwa.up.railway.app/api/buku-purwacaraka/all');
        if (!response.ok) {
            throw new Error('Failed to fetch grades');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching grades:', error);
        throw error;
    }
}

export async function fetchEntryDataById(id){
    try {
        const response = await fetch(`https://silk-purwa.up.railway.app/api/entry-transaksi-siswa/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching entry data:", error);
        return null;
    }
};
