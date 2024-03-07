import Card from 'react-bootstrap/Card';
import '../styles/cardHomepage.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CardInputData({ icon, title }) {
  return (
    <Card className="card-custom" style={{ width: '18rem' }}>
      <Card.Body>
        <FontAwesomeIcon icon={icon} className="custom-icon" />
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CardInputData;
