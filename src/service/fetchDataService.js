export async function fetchGradeKursus() {
    try {
        const response = await fetch('http://localhost:8080/api/grade-kursus/all');
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
        const response = await fetch('http://localhost:8080/api/jurusan-kursus/all');
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
        const response = await fetch('http://localhost:8080/api/buku-purwacaraka/all');
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
