import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import BookOpenIcon from 'mdi-react/BookOpenVariantIcon';
import CalendarIcon from 'mdi-react/CalendarDayIcon';
import DiplomateIcon from 'mdi-react/CertificateOutlineIcon';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import HomeBanner from '../components/app/HomeBanner';
import DiplomatePreview from '../components/diplomate/DiplomatePreview';
import DiplomatePreviewSkeleton from '../components/diplomate/DiplomatePreviewSkeleton';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [diplomateArray, setDiplomateArray] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    if (diplomateArray.length === 0) {
      try {
        setIsLoading(true);
        const res = await axios({ method: 'GET', url: `http://${process.env.REACT_APP_IP_HOST ? process.env.REACT_APP_IP_HOST : 'localhost'}:8081/api/v1/diplomates` });
        setDiplomateArray(res.data);
        setIsLoading(false);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    }
  }, []);

  const getDiplomateDataHandler = async (diplomateId) => {
    history.push(`/diplomado/${diplomateId}`);
  };

  const diplomateCards = diplomateArray.map((diplomate) => (
    <Col sm={6} md={6} lg={4} xl={4} key={diplomate.id} style={{ marginBottom: '24px' }}>
      <div id={`diplomado-${diplomate.id}`} className="h-100">
        <DiplomatePreview
          className="h-100"
          id={diplomate.id}
          title={diplomate.title}
          image={diplomate.image}
          description={diplomate.description}
          onClick={getDiplomateDataHandler}
        />
      </div>
    </Col>
  ));

  return (
    <>
      <HomeBanner />
      <Container className="p-0">
        <Row>
          <Col sm={8}>
            <Card
              className="px-3 pb-3 pt-2"
              style={{
                marginTop: '-3em', backgroundColor: '#F4F8FB', border: 'none', borderTop: '10px solid #0C497E', borderRadius: '10px',
              }}
            >
              <Card.Body>
                <Card.Title style={{ display: 'flex', alignItems: 'center', color: '#E86A35' }}>
                  <BookOpenIcon style={{ marginRight: '0.3em' }} />
                  Acerca de
                </Card.Title>
                <Card.Text>
                  El Departamento de Ingeniería Informática imparte desde hace más de 17 años
                  diplomados en el área de seguridad informática, orientándose a diversidad
                  de profesionales cuyo trabajo se relaciona con la seguridad del manejo de
                  la información y la realización de peritajes informáticos, entre ellos:
                  abogados, auditores, ingenieros, informáticos, ejecutivos y oficiales de
                  la Fuerzas Armadas o de Orden.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card
              className="px-3 pb-3 pt-2"
              style={{
                marginTop: '-3em', backgroundColor: '#F4F8FB', border: 'none', borderTop: '10px solid #0C497E', borderRadius: '10px',
              }}
            >
              <Card.Body>
                <Card.Title style={{ display: 'flex', alignItems: 'center', color: '#E86A35' }}>
                  <CalendarIcon style={{ marginRight: '0.3em' }} />
                  Fechas importantes
                </Card.Title>
                <ul>
                  <li>Evaluación 1: Miércoles 04 de Mayo, 2021</li>
                  <li>Evaluación 2: Martes 01 de Junio, 2021</li>
                  <li>Evaluación 3: Miércoles 11 de Agosto, 2021</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row id="listado-diplomados">
          <Col>
            <h1
              className="mt-4"
              style={{
                display: 'flex', alignItems: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#0C497E',
              }}
            >
              <DiplomateIcon style={{ marginRight: '0.3em' }} />
              Diplomados
            </h1>
            <hr className="mb-4 mt-0" />
          </Col>
        </Row>
        <Row className="mb-4">
          {isLoading && (<DiplomatePreviewSkeleton />)}
          {!isLoading && diplomateCards}
        </Row>
      </Container>
    </>
  );
};

export default Home;
