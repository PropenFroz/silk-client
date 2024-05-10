import Card from 'react-bootstrap/Card';
import '../styles/cardHomepage.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function CardInputData({ icon, title, link }) {
  const cardBody = (
    <Card.Body>
      <FontAwesomeIcon icon={icon} className="custom-icon" />
      <Card.Title>{title}</Card.Title>
    </Card.Body>
  );

  // Render the card as a link if a link is provided
  if (link) {
    return (
      <Link to={link} className="card-link">
        <Card className="card-custom" style={{ width: '18rem' }}>
          {cardBody}
        </Card>
      </Link>
    );
  } else {
    return (
      <Card className="card-custom" style={{ width: '18rem' }}>
        {cardBody}
      </Card>
    );
  }
}

export default CardInputData;