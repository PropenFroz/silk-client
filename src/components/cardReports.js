import Card from 'react-bootstrap/Card';
import '../styles/cardHomepage.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

function CardInputData({ icon, title }) {
  return (
    <Card className="card-laporan" >
      <Card.Body>
        <FontAwesomeIcon icon={faClipboard} className="icon-laporan" />
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CardInputData;
