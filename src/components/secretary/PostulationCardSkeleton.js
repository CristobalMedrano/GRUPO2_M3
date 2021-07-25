import React from 'react';
import {
  Card, Col, Row, Spinner,
} from 'react-bootstrap';

const PostulationCardSkeleton = () => (
  <>
    {[1, 2, 3].map((number) => (
      <Card
        key={number}
        style={{
          border: 'none', borderRadius: '10px', backgroundColor: 'white', marginBottom: '0.5em', marginTop: '0.5em',
        }}
      >
        <Card.Body>
          <Row style={{ display: 'flex', height: '254px' }}>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Spinner animation="border" style={{ height: '80px', width: '80px', color: '#E68041' }} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ))}

  </>
);

export default PostulationCardSkeleton;
