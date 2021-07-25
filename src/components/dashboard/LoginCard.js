import React from 'react';
import {
  Button, Card, Form, Container, Row, Col,
} from 'react-bootstrap';
import './LoginCard.css';
import EmailIcon from 'mdi-react/EmailIcon';
import KeyIcon from 'mdi-react/KeyIcon';

const LoginCard = (props) => {
  const { accessRole } = props;

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Card style={{
      width: '450px', border: 'none', borderRadius: '10px', backgroundColor: '#F4F8FB', borderTop: '10px solid #0C497E', paddingTop: '1em',
    }}
    >
      <Form onSubmit={onSubmitHandler}>
        <Card.Header style={{ border: 'none', backgroundColor: 'transparent' }}>
          <Card.Title style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E86A35', fontSize: '1.6em', backgroundColor: 'transparent',
          }}
          >
            Iniciar Sesión
            {accessRole}
          </Card.Title>
        </Card.Header>
        <hr style={{
          marginLeft: '1em', marginRight: '1em', marginTop: '0.5em', marginBottom: '0.5em',
        }}
        />
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <EmailIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Correo electrónico

                  </Form.Label>
                  <Form.Control required type="email" placeholder="Ingresa tu correo electrónico" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <KeyIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Contraseña
                  </Form.Label>
                  <Form.Control required type="password" placeholder="Ingresa tu contraseña" />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <hr style={{
          marginLeft: '1em', marginRight: '1em', marginTop: '0em', marginBottom: '0em',
        }}
        />
        <Card.Footer style={{ border: 'none', backgroundColor: 'transparent' }}>
          <Button type="submit" variant="card" className="my-2" style={{ width: '100%' }}>Ingresar</Button>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default LoginCard;
