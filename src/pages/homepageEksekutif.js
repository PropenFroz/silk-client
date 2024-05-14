import React, { useState, useEffect } from "react";
import SideBarEksekutif from "../components/sidebarEksekutif";
import "../styles/homepage.css";
import "chart.js/auto";
import { useAuth } from "../components/auth/context/AuthContext";
import { useHistory } from "react-router-dom";
import { config } from "../Constants";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { fetchJurusanKursus } from "../service/fetchDataService";

export default function HomepageEksekutif() {
  const baseUrl = config.url.API_BASE_URL + "/api/";
  const Auth = useAuth();
  const user = Auth.getUser();
  const history = useHistory();
  const [isEksekutif, setIsEksekutif] = useState(true);
  const [jurusanKursus, setJurusanKursus] = useState([]);
  const [selectedJurusan, setSelectedJurusan] = useState("1");

  const [pieChartData, setPieChartData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2024);

  const [barChartPendapatanData, setBarChartPendapatanData] = useState(null);
  const [barChartPengeluaranData, setBarChartPengeluaranData] = useState(null);

  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);

  useEffect(() => {
    if (user != null) {
      setIsEksekutif(user.data.role[0] === "Eksekutif");
    }
    fetchjurusanKursus();
  }, []);

  useEffect(() => {
    fetchPieChartData(selectedJurusan);
  }, [selectedJurusan]);

  useEffect(() => {
    if (selectedYear) {
      fetchTotalPendapatan(selectedYear);
      fetchTotalPengeluaran(selectedYear);
      fetchPendapatanBarChartData(selectedYear);
      fetchPengeluaranBarChartData(selectedYear);
    }
  }, [selectedYear]);

  if (user == null) {
    history.push("/login");
    return null;
  }
  if (!isEksekutif) {
    history.push("/login");
    return null;
  }

  const fetchjurusanKursus = async () => {
    try {
      const jurusanData = await fetchJurusanKursus();
      setJurusanKursus(jurusanData);
    } catch (error) {
      console.error("Error fetching jurusan options:", error);
    }
  };

  const fetchPieChartData = async (idJurusan) => {
    try {
      const response = await fetch(`${baseUrl}siswa/dashboard/${idJurusan}`);
      const data = await response.json();
      setPieChartData(data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  const fetchPendapatanBarChartData = async (tahun) => {
    try {
      const response = await fetch(`${baseUrl}dashboard/grafik-pendapatan?tahun=${tahun}`);
      const data = await response.json();
      setBarChartPendapatanData(data);
    } catch (error) {
      console.error("Error fetching bar chart pendapatan data:", error);
    }
  };

  const fetchPengeluaranBarChartData = async (tahun) => {
    try {
      const response = await fetch(`${baseUrl}dashboard/grafik-pengeluaran?tahun=${tahun}`);
      const data = await response.json();
      setBarChartPengeluaranData(data);
    } catch (error) {
      console.error("Error fetching bar chart pengeluaran data:", error);
    }
  };

  const fetchTotalPendapatan = async (tahun) => {
    try {
      const response = await fetch(`${baseUrl}dashboard/pendapatan?tahun=${tahun}`);
      const data = await response.json();
      setTotalPendapatan(data);
    } catch (error) {
      console.error("Error fetching total pendapatan data:", error);
    }
  };

  const fetchTotalPengeluaran = async (tahun) => {
    try {
      const response = await fetch(`${baseUrl}dashboard/pengeluaran?tahun=${tahun}`);
      const data = await response.json();
      setTotalPengeluaran(data);
    } catch (error) {
      console.error("Error fetching total pengeluaran data:", error);
    }
  };

  if (user == null) {
    history.push("/login");
    return null;
  }

  const totalSiswa = pieChartData ? pieChartData.baru + pieChartData.cuti + pieChartData.cutiMasukKembali + pieChartData.off : 0;

  const pieData = {
    labels: totalSiswa !== 0 ? ["Baru", "Cuti", "Cuti Masuk Kembali", "Off"] : ["Belum ada siswa yang terdaftar"],
    datasets: [
      {
        label: "Status Siswa",
        data: totalSiswa !== 0 ? [pieChartData.baru || 0, pieChartData.cuti || 0, pieChartData.cutiMasukKembali || 0, pieChartData.off || 0] : [0],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += context.parsed + (pieChartData ? " siswa" : "");
            return label;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const barData = {
    labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    datasets: [
      {
        label: "Pendapatan",
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [
          barChartPendapatanData?.januari || 0,
          barChartPendapatanData?.februari || 0,
          barChartPendapatanData?.maret || 0,
          barChartPendapatanData?.april || 0,
          barChartPendapatanData?.mei || 0,
          barChartPendapatanData?.juni || 0,
          barChartPendapatanData?.juli || 0,
          barChartPendapatanData?.agustus || 0,
          barChartPendapatanData?.september || 0,
          barChartPendapatanData?.oktober || 0,
          barChartPendapatanData?.november || 0,
          barChartPendapatanData?.desember || 0,
        ],
      },
      {
        label: "Pengeluaran",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: [
          barChartPengeluaranData?.januari || 0,
          barChartPengeluaranData?.februari || 0,
          barChartPengeluaranData?.maret || 0,
          barChartPengeluaranData?.april || 0,
          barChartPengeluaranData?.mei || 0,
          barChartPengeluaranData?.juni || 0,
          barChartPengeluaranData?.juli || 0,
          barChartPengeluaranData?.agustus || 0,
          barChartPengeluaranData?.september || 0,
          barChartPengeluaranData?.oktober || 0,
          barChartPengeluaranData?.november || 0,
          barChartPengeluaranData?.desember || 0,
        ],
      },
    ],
  };

  return (
    <div className="dashboard d-flex">
      <SideBarEksekutif />
      <div className="dashboard-content">
        <div className="section">
          <h2>Overview</h2>
          <div className="section-content mb-4">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header text-center">Siswa Per Jurusan</div>
                  <div className="card-body">
                    <div className="text-center mb-2">
                      <label htmlFor="jurusanKursus">Pilih Jurusan:</label>
                      <select
                        name="jurusanKursus"
                        onChange={(e) => {
                          setSelectedJurusan(e.target.value);
                          fetchPieChartData(e.target.value);
                        }}
                        value={selectedJurusan}
                      >
                        {jurusanKursus.map((jurusan) => (
                          <option key={jurusan.idJurusanKursus} value={jurusan.idJurusanKursus}>
                            {jurusan.namaJurusan}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="card-body d-flex justify-content-center align-items-center">
                      <div className="chart-container" style={{ width: "300px", height: "300px" }}>
                        <Pie data={pieData} options={pieOptions} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <div className="cards-container" style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                  <select
                    name="yearDropdown"
                    onChange={(e) => {
                      setSelectedYear(parseInt(e.target.value));
                      fetchTotalPendapatan(parseInt(e.target.value));
                      fetchTotalPengeluaran(parseInt(e.target.value));
                    }}
                    value={selectedYear}
                  >
                    {[2024, 2025, 2026, 2027, 2028].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Total Pendapatan</h5>
                      <p className="card-text">Rp{totalPendapatan.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Total Pengeluaran</h5>
                      <p className="card-text">Rp{totalPengeluaran.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <h2>Total Pendapatan dan Pengeluaran</h2>
          <div className="section-content">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown mb-3">
                      <select
                        name="yearDropdown"
                        onChange={(e) => {
                          setSelectedYear(parseInt(e.target.value));
                          fetchPendapatanBarChartData(parseInt(e.target.value));
                          fetchPengeluaranBarChartData(parseInt(e.target.value));
                        }}
                        value={selectedYear}
                      >
                        {[2024, 2025, 2026, 2027, 2028].map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="chart-container" style={{ width: "100%", height: "300px" }}>
                      <Bar data={barData} options={{ maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
