import React, { useEffect, useState } from 'react';
import {
  Card, Col, Row,
} from 'react-bootstrap';
import BellIcon from 'mdi-react/BellAlertIcon';
import axios from 'axios';
import PostulationCardCheck from './PostulationCardCheck';
import PostulationCardDocument from './PostulationCardDocument';

const PostulationCard = (props) => {
  const { postulationId, diplomadoId, responsable } = props;
  const [postulation, setPostulation] = useState({});
  const [updatePostulation, setUpdatePostulation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    try {
      const res = await axios({ method: 'GET', url: `http://${process.env.REACT_APP_IP_HOST}:8082/api/v1/diplomates/${diplomadoId}/postulations/${postulationId}` });
      setPostulation(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [updatePostulation]);

  const editPostulationHandler = async (payload) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      setIsLoading(true);
      // eslint-disable-next-line
      console.log("enviando...");
      await axios.put(`http://${process.env.REACT_APP_IP_HOST}:8082/api/v1/diplomates/${diplomadoId}/postulations/${payload.id}`, payload.postulation, { headers });
      console.log('enviado!');
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
    const updateComponent = !updatePostulation;
    setUpdatePostulation(updateComponent);
  };

  const viewDocumentHandler = (documentUrl) => {
    console.log('Viendo el documento: ', documentUrl);
  };

  const notifyDocumentPostulantHandler = (id) => {
    console.log('Notificar documentos de la postulación: ', id, 'del diplomado: ', diplomadoId);
  };

  const notifyStatusPostulantHandler = (id) => {
    console.log('Notificar estatus de la postulación: ', id, 'del diplomado: ', diplomadoId);
  };

  const editDocumentPostulationHandler = async (status) => {
    const copyPostulation = { ...postulation };
    delete copyPostulation.id;
    const editedPostulation = { ...copyPostulation, received: status };
    await editPostulationHandler({ postulation: editedPostulation, id: postulation.id });
  };

  const editStatusPostulationHandler = async (status) => {
    const copyPostulation = { ...postulation };
    delete copyPostulation.id;
    const editedPostulation = { ...copyPostulation, valid: status };
    await editPostulationHandler({ postulation: editedPostulation, id: postulation.id });
  };

  return (
    <Card style={{
      border: 'none', borderRadius: '10px', backgroundColor: 'white', marginBottom: '0.5em', marginTop: '0.5em',
    }}
    >
      <Card.Body>
        <Row>
          <Col sm={2}>
            <Row style={{ height: '100%' }}>
              <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', fontSize: '1.5em' }}>
                  <div>
                    #
                    {' '}
                    {postulation.id}
                  </div>
                </div>
              </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '1.5em' }} />

          </Col>
          <Col sm={responsable ? 6 : 4}>
            <PostulationCardDocument
              key={`${postulation.id}document1`}
              documentName="Título profesional o Certificado de Egreso"
              documentUrl={postulation.graduateCertificate}
              onClickDocument={viewDocumentHandler}
            />
            <PostulationCardDocument
              key={`${postulation.id}document2`}
              documentName="Certificado de nacimiento"
              documentUrl={postulation.birthCertificate}
              onClickDocument={viewDocumentHandler}
            />
            <PostulationCardDocument
              key={`${postulation.id}document3`}
              documentName="Copia de Cédula de identidad"
              documentUrl={postulation.copyIdentityCard}
              onClickDocument={viewDocumentHandler}
            />
            <PostulationCardDocument
              key={`${postulation.id}document4`}
              documentName="Currículum Vitae"
              documentUrl={postulation.curriculumVitae}
              onClickDocument={viewDocumentHandler}
            />
            <PostulationCardDocument
              key={`${postulation.id}document5`}
              documentName="Ficha de inscripción"
              documentUrl={postulation.registrationForm}
              onClickDocument={viewDocumentHandler}
            />
          </Col>
          { responsable ? '' : (
            <Col sm={3} style={{ display: 'flex', flexDirection: 'column' }}>
              <PostulationCardCheck
                id={postulation.id}
                isLoading={isLoading}
                status={postulation.received}
                correctMessage="Recepcionados"
                incorrectMessage="Pendiente de información"
                labelMessage="estado de los documentos"
                labelOptionMessage="Marcar documentos como:"
                iconButtonMessage={<BellIcon size="1em" style={{ marginRight: '0.5em' }} />}
                buttonMessage="Notificar postulante"
                onSendNotification={notifyDocumentPostulantHandler}
                onEditPostulation={editDocumentPostulationHandler}
              />
            </Col>
          )}

          <Col sm={responsable ? 4 : 3} style={{ display: 'flex', flexDirection: 'column' }}>
            <PostulationCardCheck
              disabled={responsable}
              id={postulation.id}
              statusInverse
              status={postulation.valid}
              correctMessage="Válida"
              incorrectMessage="Rechazada"
              labelMessage="estado de la postulación"
              labelOptionMessage="Marcar postulación como:"
              iconButtonMessage={<BellIcon size="1em" style={{ marginRight: '0.5em' }} />}
              buttonMessage="Notificar Responsable"
              buttonMessage2="Notificar Director"
              onSendNotification={notifyStatusPostulantHandler}
              onEditPostulation={editStatusPostulationHandler}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PostulationCard;
