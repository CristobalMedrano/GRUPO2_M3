/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, Button,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DiplomateLargeCard from '../components/secretary/DiplomateLargeCard';
import DiplomateLargeCardSkeleton from '../components/secretary/DiplomateLargeCardSkeleton';
// import PostulationCard from '../components/secretary/PostulationCard';
const DashboardResponsable = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [postulations, setPostulations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    if (postulations.length === 0) {
      try {
        setIsLoading(true);
        const diplomatePostulants = [];
        const resDiplomate = await axios({ method: 'GET', url: `http://${process.env.REACT_APP_IP_HOST ? process.env.REACT_APP_IP_HOST : 'localhost'}:8082/api/v1/diplomates` });
        const diplomates = resDiplomate.data;
        await Promise.all(
          diplomates.map(async (diplomate) => {
            const res = await axios({ method: 'GET', url: `http://${process.env.REACT_APP_IP_HOST ? process.env.REACT_APP_IP_HOST : 'localhost'}:8082/api/v1/diplomates/${diplomate.id}/postulations` });
            const validPostulants = [...res.data].filter((postulant) => postulant.valid);
            const postulation = {
              title: diplomate.title,
              id: diplomate.id,
              numberPostulations: validPostulants.length,
              postulants: validPostulants,
            };
            diplomatePostulants.push(postulation);
          }),
        );
        diplomatePostulants.sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        });
        setPostulations(diplomatePostulants);
        setIsLoading(false);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    }
  }, []);

  const getDiplomatePostulations = async (diplomate) => {
    history.push(`consejo/diplomado/${diplomate.id}?titulo=${diplomate.title}`);
  };

  const listDiplomates = postulations.map((diplomate) => (
    <DiplomateLargeCard
      key={diplomate.id}
      id={diplomate.id}
      title={diplomate.title}
      numberPostulations={diplomate.numberPostulations}
      onClick={getDiplomatePostulations}
    />
  ));

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Card style={{
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#F4F8FB',
            borderTop: '10px solid #0C497E',
          }}
          >
            <Card.Body>
              <Container style={{ paddingLeft: '0.5em', paddingRight: '0.5em' }}>
                <Row>
                  <Col>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2em',
                      fontWeight: 'bold',
                      marginBottom: '0.5em',
                      color: '#E86A35',
                    }}
                    >
                      Listado de postulaciones a diplomados 1-2021
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {isLoading && <DiplomateLargeCardSkeleton />}
                    {!isLoading && listDiplomates}
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};

export default DashboardResponsable;
