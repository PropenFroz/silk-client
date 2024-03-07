export async function fetchTransaksiBukuByDate(startDate, endDate) {
    try {
      const url = `http://localhost:8080/api/entry-transaksi-buku/filter-by-date?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

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
  