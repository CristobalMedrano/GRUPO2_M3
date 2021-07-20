import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button, Modal,
} from 'react-bootstrap';
import SendIcon from 'mdi-react/SendIcon';
import CertificateIcon from 'mdi-react/CertificateIcon';
import FileDocumentIcon from 'mdi-react/FileDocumentIcon';
import FileDocumentMultipleIcon from 'mdi-react/FileDocumentMultipleIcon';
import CardAccountDetailsIcon from 'mdi-react/CardAccountDetailsIcon';
import BookAccountIcon from 'mdi-react/BookAccountIcon';
import './PostulantInscriptionForm.css';

const PostulantInscriptionForm = (props) => {
  const [birthCertificateFile, setBirthCertificateFile] = useState(null);
  const [copyIdentityCardFile, setCopyIdentityCardFile] = useState(null);
  const [curriculumVitaeFile, setCurriculumVitaeFile] = useState(null);
  const [graduateCertificateFile, setGraduateCertificateFile] = useState(null);
  const [registrationFormFile, setRegistrationFormFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { title, show, onHide } = props;

  function handleBirthCertificateChange(event) {
    // validaciones
    setBirthCertificateFile(event.target.value);
  }

  function handleCopyIdentityCardChange(event) {
    // validaciones
    setCopyIdentityCardFile(event.target.value);
  }

  function handleCurriculumVitaeChange(event) {
    // validaciones
    setCurriculumVitaeFile(event.target.value);
  }

  function handleGraduateCertificateChange(event) {
    // validaciones
    setGraduateCertificateFile(event.target.value);
  }

  function handleRegistrationFormFile(event) {
    // validaciones
    setRegistrationFormFile(event.target.value);
  }

  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    const payload = {
      name: 'das',
      email: 'formState.email',
    };
    await props.onSubmitPostulantInscriptionForm(payload);
    setIsLoading(false);
    // Liberar states
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
                Formulario de Inscripción
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
                    <BookAccountIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Certificado de nacimiento
                  </Form.Label>
                  <Form.Control required disabled={isLoading} type="file" value={birthCertificateFile} onChange={handleBirthCertificateChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <CardAccountDetailsIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Copia carnet de identidad
                  </Form.Label>
                  <Form.Control required disabled={isLoading} type="file" value={copyIdentityCardFile} onChange={handleCopyIdentityCardChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <FileDocumentMultipleIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Curriculum Vitae
                  </Form.Label>
                  <Form.Control required disabled={isLoading} type="file" value={curriculumVitaeFile} onChange={handleCurriculumVitaeChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <CertificateIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Certificado de graduación
                  </Form.Label>
                  <Form.Control required disabled={isLoading} type="file" value={graduateCertificateFile} onChange={handleGraduateCertificateChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <FileDocumentIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Formulario de registro
                  </Form.Label>
                  <Form.Control required disabled={isLoading} type="file" value={registrationFormFile} onChange={handleRegistrationFormFile} />
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

export default PostulantInscriptionForm;
