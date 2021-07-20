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
  const [copyIdentityCardFile, setCopyIdentityCardFile] = useState(null);
  const [curriculumVitaeFile, setCurriculumVitaeFile] = useState(null);
  const [graduateCertificateFile, setGraduateCertificateFile] = useState(null);
  const [registrationFormFile, setRegistrationFormFile] = useState(null);
  /* const [linksToDocuments, setLinksToDocuments] = useState({
    birthCertificate: '',
    copyIdentityCard: '',
    curriculumVitae: '',
    graduateCertificate: '',
    registrationForm: '',
  }); */
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

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const arrayVars = [birthCertificateFile, copyIdentityCardFile,
      curriculumVitaeFile, graduateCertificateFile, registrationFormFile];
    const arrayChars = ['birthCertificate', 'copyIdentityCard',
      'curriculumVitae', 'graduateCertificate', 'registrationForm'];
    // eslint-disable-next-line
    let arrayLinks = [];
    const timeStamp = Date.now();
    const storageRef = storage.ref();
    arrayVars.forEach((element) => {
      // eslint-disable-next-line
      const uploadTask = storageRef.child(`${timeStamp + arrayChars[arrayVars.indexOf(element)] + '.pdf'}`).put(element);
      uploadTask.on('state_changed',
        (snapshot) => {
          // file upload progress report
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(progress);
        },
        (error) => {
          // file upload failed
          console.log(error);
        },
        // eslint-disable-next-line
        async () => {
          // file upload completed
          try {
            // eslint-disable-next-line
            arrayLinks[arrayVars.indexOf(element)] = await storageRef.child(`${timeStamp + arrayChars[arrayVars.indexOf(element)] + '.pdf'}`).getDownloadURL();
            console.log(arrayLinks);
            if (arrayLinks.length === 5) {
              console.log('SUBI TODO!');
              const payload = {
                birthCertificate: arrayLinks[0],
                copyIdentityCard: arrayLinks[1],
                curriculumVitae: arrayLinks[2],
                graduateCertificate: arrayLinks[3],
                registrationForm: arrayLinks[4],
                received: false,
                valid: false,
              };
              console.log(payload);
              await props.onSubmitPostulantInscriptionForm(payload);
              setIsLoading(false);
              // Liberar states
              setBirthCertificateFile(null);
              setCopyIdentityCardFile(null);
              setCurriculumVitaeFile(null);
              setGraduateCertificateFile(null);
              setRegistrationFormFile(null);
              arrayLinks = [];
            }
          } catch (error) {
            console.log(error);
          }
        });
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
                  <Form.Control required disabled={isLoading} type="file" onChange={handleCopyIdentityCardChange} />
                </Form.Group>
                <Form.Group required className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <FileDocumentMultipleIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Curriculum Vitae
                  </Form.Label>
                  <Form.Control required disabled={isLoading} type="file" onChange={handleCurriculumVitaeChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <CertificateIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Certificado de graduación
                  </Form.Label>
                  <Form.Control required disabled={isLoading} type="file" onChange={handleGraduateCertificateChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#0c497e', display: 'flex', alignItems: 'center' }}>
                    <FileDocumentIcon size="1.5em" style={{ marginRight: '0.5em' }} />
                    Formulario de registro
                  </Form.Label>
                  <Form.Control required disabled={isLoading} type="file" onChange={handleRegistrationFormFile} />
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
