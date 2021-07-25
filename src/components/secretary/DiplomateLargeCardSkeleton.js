import React from 'react';
import {
  Card, Col, Row, Spinner,
} from 'react-bootstrap';

const DiplomateLargeCardSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5].map((number) => (
      <Card
        key={number}
        style={{
          border: 'none', borderRadius: '10px', backgroundColor: 'white', marginBottom: '0.5em', marginTop: '0.5em',
        }}
      >
        <Card.Body>
          <Row style={{ display: 'flex', height: '42px' }}>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Spinner animation="border" style={{ height: '30px', width: '30px', color: '#E68041' }} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ))}

  </>
);

export default DiplomateLargeCardSkeleton;
