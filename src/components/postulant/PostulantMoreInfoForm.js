import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button, Modal,
} from 'react-bootstrap';
import SendIcon from 'mdi-react/SendIcon';
import EmailIcon from 'mdi-react/EmailIcon';
import AccountIcon from 'mdi-react/AccountIcon';
import TextAccountIcon from 'mdi-react/TextAccountIcon';
import './PostulantMoreInfoForm.css';

const PostulantMoreInfoForm = (props) => {
  const [formState, setFormState] = useState({ name: '', email: '', lastName: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { title, show, onHide } = props;

  function handleNameChange(event) {
    setFormState(
      {
        name: event.target.value,
        email: formState.email,
        lastName: formState.lastName,
      },
    );
  }

  function handleEmailChange(event) {
    setFormState(
      {
        name: formState.name,
        email: event.target.value,
        lastName: formState.lastName,
      },
    );
  }

  function handleLastNameChange(event) {
    setFormState(
      {
        name: formState.name,
        email: formState.email,
        lastName: event.target.value,
      },
    );
  }

  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    const nameOnly = formState.name;
    const lastNameOnly = formState.lastName;
    const fullName = `${nameOnly} ${lastNameOnly}`;
    const payload = {
      name: fullName,
      email: formState.email,
    };
    await props.onSubmitPostulantForm(payload);
    setIsLoading(false);
    setFormState({
      name: '',
      email: '',
      lastName: '',
    });
  }

  return (
    <Modal
      show={show}
      size="lg"
      centered
      backdrop="static"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header style={{ border: 'none' }}>
          <Modal.Title>
            <div>
              <div style={{
                color: '#E86A35', marginBottom: 0, fontSize: '0.8em', fontWeight: 'normal',
              }}
              >
                { title }
              </div>
              <div style={{
                color: '#0c497e', marginTop: '-0.3em', fontSize: '1em', fontWeight: 'bold',
              }}
              >
                Formulario de Contacto
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <hr style={{
          marginTop: '0em', marginBottom: '0em', marginLeft: '1em', marginRight: '1em',
        }}
        />
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <AccountIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Nombre
                  </Form.Label>
                  <Form.Control required disabled={isLoading} onChange={handleNameChange} value={formState.name} type="text" placeholder="Ingrese su nombre" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <TextAccountIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Apellido
                  </Form.Label>
                  <Form.Control required disabled={isLoading} onChange={handleLastNameChange} value={formState.lastName} type="text" placeholder="Ingrese su apellido" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <EmailIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Correo electrónico
                  </Form.Label>
                  <Form.Control required disabled={isLoading} onChange={handleEmailChange} value={formState.email} type="email" placeholder="Ingrese su correo electrónico" />
                  <Form.Text className="text-muted">
                    Por tu seguridad, no compartiremos este correo electrónico con nadie.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <hr style={{
          marginTop: '0em', marginBottom: '0em', marginLeft: '1em', marginRight: '1em',
        }}
        />
        <Modal.Footer style={{ border: 'none' }}>
          <Button disabled={isLoading} variant="outline-danger" onClick={onHide}>Cancelar</Button>
          <Button
            style={{
              display: 'flex', alignItems: 'center', paddingLeft: '1em', paddingRight: '1em',
            }}
            disabled={isLoading}
            variant="success"
            type="submit"
          >
            {isLoading ? 'ENVIANDO...' : 'ENVIAR'}
            <SendIcon style={{ marginLeft: '0.5em' }} size="1em" />
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>

  );
};

export default PostulantMoreInfoForm;
