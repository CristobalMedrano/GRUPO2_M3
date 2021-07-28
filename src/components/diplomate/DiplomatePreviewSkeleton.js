import React from 'react';
import {
  Col, Button, Card, Spinner,
} from 'react-bootstrap';
import './DiplomatePreviewSkeleton.css';

const DiplomatePreviewSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5].map((id) => (
      <Col sm={6} md={6} lg={4} xl={4} key={id} style={{ marginBottom: '24px' }}>

        <Card
          className="h-100"
          style={{
            border: 'none', borderRadius: '10px', backgroundColor: '#F4F8FB',
          }}
        >
          <div style={{
            borderRadius: '10px 10px 0px 0px',
            height: '250px',
            width: '100%',
            objectFit: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#D3D7DA',
          }}
          >
            <Spinner animation="border" style={{ height: '5em', width: '5em', color: '#E68041' }} />
          </div>
          <Card.Body />
          <div style={{ display: 'flex', padding: '0 1em 1em 1em', justifyContent: 'flex-end' }}>
            <Button disabled variant="card" type="submit" loading>Cargando...</Button>
          </div>
        </Card>
      </Col>
    ))}
  </>

);

export default DiplomatePreviewSkeleton;
