import React from 'react';
import {
  Button, Card, Col, Row,
} from 'react-bootstrap';
import './DiplomateLargeCard.css';

const DiplomateLargeCard = (props) => {
  const { id, title, numberPostulations } = props;

  const onClickDiplomateHandler = () => {
    props.onClick({ id, title });
  };
  return (
    <Card style={{
      border: 'none', borderRadius: '10px', backgroundColor: 'white', marginBottom: '0.5em', marginTop: '0.5em',
    }}
    >
      <Card.Body>
        <Row>
          <Col sm={6} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '1em',
              fontWeight: 'bold',
              color: '#E86A35',
            }}
            >
              {title}
            </div>
          </Col>
          <Col sm={2} style={{ display: 'flex', alignItems: 'center' }}>
            Postulaciones:
            {' '}
            <div style={{ marginLeft: '0.5em', fontWeight: 'bold' }}>
              {numberPostulations}
            </div>
          </Col>
          <Col sm={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              disabled={numberPostulations === 0}
              variant="card"
              onClick={onClickDiplomateHandler}
            >
              {numberPostulations === 0 ? 'No hay postulaciones' : 'Revisar postulaciones'}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>

  );
};

export default DiplomateLargeCard;
