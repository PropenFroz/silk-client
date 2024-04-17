import { config } from '../Constants'

const baseUrl = config.url.API_BASE_URL + '/api/';


export async function fetchGradeKursus() {
    try {
        const response = await fetch(`${baseUrl}grade-kursus/all`);
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
        const response = await fetch(`${baseUrl}jurusan-kursus/all`);
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
        const response = await fetch(`${baseUrl}buku-purwacaraka/all`);
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
        const response = await fetch(`${baseUrl}entry-transaksi-siswa/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching entry data:", error);
        return null;
    }
};

export async function fetchIuranSiswaById(id){
    try {
        const response = await fetch(`${baseUrl}iuran-siswa/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching iuran siswa:", error);
        return null;
    }
};

export async function fetchGuru() {
    try {
        const response = await fetch(`${baseUrl}guru/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch guru');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching guru:', error);
        throw error;
    }
}

export async function fetchSiswa() {
    try {
        const response = await fetch(`${baseUrl}siswa/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch siswa');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching siswa:', error);
        throw error;
    }
}

export async function fetchEntryGajiGuruById(id){
    try {
        const response = await fetch(`${baseUrl}entry-gaji-guru/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching iuran siswa:", error);
        return null;
    }
};




