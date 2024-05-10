import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/context/AuthContext';
import { useHistory } from 'react-router-dom'; //
import '../styles/laporan.css';
import SideBarKaryawan from '../components/sidebarKaryawan';
import EntryDetailGajiGuru from '../components/entryDetailGajiGuru';
import { config } from '../Constants'

export default function EntryGajiGuru() {
    const baseUrl = config.url.API_BASE_URL + '/api/';

    const Auth = useAuth();
    const user = Auth.getUser();
    const history = useHistory();

    useEffect(() => {
        if (user == null) {
            history.push('/login');
        }
    }, [user, history]);

    return (
        <div className="dashboard d-flex">
            <SideBarKaryawan/>
            <div className="dashboard-content">
                <h2>Masukkan Data Gaji Guru</h2>
                <EntryDetailGajiGuru />
            </div>
        </div>
    )
}