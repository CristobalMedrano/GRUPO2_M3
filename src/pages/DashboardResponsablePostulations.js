/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, Col, Container, Row, Button,
} from 'react-bootstrap';
import { useLocation, useParams, useHistory } from 'react-router-dom';

import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import PostulationCard from '../components/secretary/PostulationCard';
import PostulationCardHeader from '../components/secretary/PostulationCardHeader';
import PostulationCardSkeleton from '../components/secretary/PostulationCardSkeleton';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const DashboardResponsablePostulations = () => {
  const { diplomadoId } = useParams();
  const diplomadoTitulo = useQuery().get('titulo');
  const [isLoading, setIsLoading] = useState(false);
  const [postulations, setPostulations] = useState([]);
  const history = useHistory();
  // const [updatePostulations, setUpdatePostulations] = useState(false);

  useEffect(async () => {
    try {
      setIsLoading(true);
      const res = await axios({ method: 'GET', url: `http://localhost:8082/api/v1/diplomates/${diplomadoId}/postulations` });
      res.data.sort((a, b) => {
        if (a.id < b.id) { return -1; }
        if (a.id > b.id) { return 1; }
        return 0;
      });
      setPostulations(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const backHandler = () => {
    history.push('/tablero/consejo');
  };

  return (
    <Container>
      <Row className="my-4">
        <Col sm={12} className="mb-2">
          <Card style={{
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#F4F8FB',
            borderTop: '10px solid #0C497E',

          }}
          >
            <Card.Body>
              <Container>
                <Row>
                  <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '2em',
                      fontWeight: 'bold',
                      color: '#114A7D',
                    }}
                    >
                      <Button onClick={backHandler} variant="primary-outline" style={{ marginRight: '0.3em' }}>
                        <ArrowLeftIcon />
                      </Button>
                      {diplomadoTitulo}
                    </div>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12}>
          <Card style={{
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#F4F8FB',
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
                      marginBottom: '1em',
                      color: '#E86A35',
                    }}
                    >
                      Listado de postulaciones
                    </div>
                    <PostulationCardHeader responsable />

                    {isLoading && <PostulationCardSkeleton />}
                    {!isLoading
                        && postulations.map((postulation) => (
                          <PostulationCard
                            key={postulation.id}
                            postulationId={postulation.id}
                            diplomadoId={diplomadoId}
                            responsable
                          />
                        ))}
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

export default DashboardResponsablePostulations;
