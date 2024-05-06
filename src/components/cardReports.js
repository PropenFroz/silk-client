import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/cardHomepage.css'; 
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

function CardReport({ title, link }) {
  return (
    <Link to={link} className="card-link">
      <Card className="card-laporan">
        <Card.Body>
          <FontAwesomeIcon icon={faClipboard} className="icon-laporan" />
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CardReport;
