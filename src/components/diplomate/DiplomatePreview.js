import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import './DiplomatePreview.css';

const DiplomatePreview = (props) => {
  const {
    id, title, image, description,
  } = props;

  const submitHandler = (event) => {
    event.preventDefault();
    props.onClick(id);
  };

  return (
    <Card
      className="h-100"
      style={{
        border: 'none', borderRadius: '10px', backgroundColor: '#F4F8FB',
      }}
    >
      <Card.Img
        variant="top"
        src={image}
        style={{
          borderRadius: '10px 10px 0px 0px', height: '250px', width: '100%', objectFit: 'cover',
        }}
      />
      <Card.Body>
        <Card.Title style={{ display: 'flex', alignItems: 'center', color: '#E86A35' }}>{ title }</Card.Title>
        <Card.Text>
          { description }
        </Card.Text>
      </Card.Body>
      <div style={{ display: 'flex', padding: '0 1em 1em 1em', justifyContent: 'flex-end' }}>
        <Form onSubmit={submitHandler}>
          <div id={`ver-diplomado-${id}`}>
            <Button variant="card" type="submit">Ver detalles</Button>
          </div>
        </Form>
      </div>
    </Card>
  );
};

export default DiplomatePreview;
