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
import storage from '../../firebase';
import './PostulantInscriptionForm.css';

const PostulantInscriptionForm = (props) => {
  const [birthCertificateFile, setBirthCertificateFile] = useState(null);
  // eslint-disable-next-line
  const [copyIdentityCardFile, setCopyIdentityCardFile] = useState(null);
  // eslint-disable-next-line
  const [curriculumVitaeFile, setCurriculumVitaeFile] = useState(null);
  // eslint-disable-next-line
  const [graduateCertificateFile, setGraduateCertificateFile] = useState(null);
  // eslint-disable-next-line
  const [registrationFormFile, setRegistrationFormFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { title, show, onHide } = props;

  function handleBirthCertificateChange(event) {
    // validaciones
    setBirthCertificateFile(event.target.files[0]);
  }

  function handleCopyIdentityCardChange(event) {
    // validaciones
    setCopyIdentityCardFile(event.target.files[0]);
  }

  function handleCurriculumVitaeChange(event) {
    // validaciones
    setCurriculumVitaeFile(event.target.files[0]);
  }

  function handleGraduateCertificateChange(event) {
    // validaciones
    setGraduateCertificateFile(event.target.files[0]);
  }

  function handleRegistrationFormFile(event) {
    // validaciones
    setRegistrationFormFile(event.target.files[0]);
  }

  function uploadFile(file, name) {
    const timeStamp = Date.now();
    const storageRef = storage.ref();
    // eslint-disable-next-line
    const uploadTask = storageRef.child(`${timeStamp + name + '.pdf'}`).put(file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // file upload progress report
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (progress === 100 && name === 'registrationForm') {
          setIsLoading(false);
        }
        console.log(progress);
      },
      (error) => {
        // file upload failed
        console.log(error);
      },
      () => {
        // file upload completed
        // eslint-disable-next-line
        storageRef.child(`${timeStamp + name + '.pdf'}`).getDownloadURL()
          .then(
            (url) => {
              // got download URL
              console.log(url);
            },
            (error) => {
              // failed to get download URL
              console.log(error);
            },
          );
      });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    // eslint-disable-next-line
    uploadFile(birthCertificateFile, 'birthCertificate');
    uploadFile(copyIdentityCardFile, 'copyIdentityCard');
    uploadFile(curriculumVitaeFile, 'curriculumVitae');
    uploadFile(graduateCertificateFile, 'graduateCertificate');
    uploadFile(registrationFormFile, 'registrationForm');
    const payload = {
      name: 'das',
      email: 'formState.email',
    };
    await props.onSubmitPostulantInscriptionForm(payload);
    // setIsLoading(false);
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
                  <Form.Control required disabled={isLoading} type="file" onChange={handleBirthCertificateChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <CardAccountDetailsIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Copia carnet de identidad
                  </Form.Label>
                  <Form.Control disabled={isLoading} type="file" onChange={handleCopyIdentityCardChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <FileDocumentMultipleIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Curriculum Vitae
                  </Form.Label>
                  <Form.Control disabled={isLoading} type="file" onChange={handleCurriculumVitaeChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <CertificateIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Certificado de graduación
                  </Form.Label>
                  <Form.Control disabled={isLoading} type="file" onChange={handleGraduateCertificateChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <FileDocumentIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Formulario de registro
                  </Form.Label>
                  <Form.Control disabled={isLoading} type="file" onChange={handleRegistrationFormFile} />
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
