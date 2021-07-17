import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import BookOpenIcon from 'mdi-react/BookOpenVariantIcon';
import CalendarIcon from 'mdi-react/CalendarDayIcon';
import DiplomateIcon from 'mdi-react/CertificateOutlineIcon';
import axios from 'axios';
import HomeBanner from '../components/app/HomeBanner';
// import DiplomateImage from '../images/woman_working_computers.jpg';
import DiplomatePreview from '../components/diplomate/DiplomatePreview';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [diplomateArray, setDiplomateArray] = useState([]);

  useEffect(async () => {
    if (diplomateArray.length === 0) {
      try {
        // eslint-disable-next-line
        console.log(diplomateArray);
        setIsLoading(true);
        const res = await axios({ method: 'GET', url: 'http://localhost:8081/api/v1/diplomates' });
        // eslint-disable-next-line
        setDiplomateArray(res.data);
        // eslint-disable-next-line
        console.log(res.data);
        setIsLoading(false);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    }
  }, []);

  const getDiplomateDataHandler = async (diplomateId) => {
    // eslint-disable-next-line
    try {
      const res = await axios({ method: 'GET', url: `http://localhost:8081/api/v1/diplomates/${diplomateId}` });
      // eslint-disable-next-line
      console.log(res.data);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  const diplomateCards = diplomateArray.map((diplomate) => (
    <Col key={diplomate.id}>
      <DiplomatePreview
        id={diplomate.id}
        title={diplomate.title}
        image={diplomate.image}
        description={diplomate.description}
        onClick={getDiplomateDataHandler}
      />
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
                  <li>Evaluación 3: Miércoles 28 de Julio, 2021</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1
              className="mt-4"
              style={{
                display: 'flex', alignItems: 'center', fontSize: '1.2em', fontWeight: 'bold',
              }}
            >
              <DiplomateIcon style={{ marginRight: '0.3em' }} />
              Diplomados
            </h1>
            <hr className="mb-4 mt-0" />
          </Col>
        </Row>
        <Row className="mb-4">
          {isLoading && (<p>Cargando....</p>)}
          {!isLoading && diplomateCards}
        </Row>
      </Container>
    </>
  );
};

export default Home;
