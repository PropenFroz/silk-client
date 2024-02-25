import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Styles from '../styles/welcome';

export default function Be1() {
    const [responseData, setResponseData] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/test')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // Mengambil teks dari respons
            })
            .then(data => {
                console.log('Response from server:', data);
                setResponseData(data); // Menyimpan data respons dalam state
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []); // Menggunakan array kosong untuk hanya menjalankan efek sekali setelah komponen dimuat

    return (
        <Styles>
            <Navbar welcome={true} />
            <div className="circle1"></div>
            <div id="welcome">
                <Container>
                    <div className="gap"></div>
                    <h2>Selamat Datang,</h2>
                    <h1><b>backend!</b></h1>
                    <p>{responseData}</p> {/* Menampilkan data dari respons */}
                    <div className="gap"></div>
                </Container>
            </div>
            <Footer />
        </Styles>
    );
}
