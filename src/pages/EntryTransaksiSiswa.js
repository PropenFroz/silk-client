import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import EntryData from '../components/EntryData'
import '../styles/laporan.css';
import Styles from '../styles/welcome'

export default function Welcome() {
    return (
        <Styles>
            <Container>
                <h2>Masukkan Data Transaksi Pembayaran</h2>
                    <EntryData>/
                    </EntryData>
            </Container>
        </Styles>
    )
}