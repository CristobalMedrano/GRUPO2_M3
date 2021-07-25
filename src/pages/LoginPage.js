import React from 'react';
import {
  Col,
  Container, Row,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LoginFake from '../components/dashboard/LoginFake';
// import LoginCard from '../components/dashboard/LoginCard';

const LoginPage = () => {
  const history = useHistory();

  const redirectToSecretaryHandler = () => {
    history.push('/tablero/secretaria');
  };
  const redirectToResponsableHandler = () => {
    history.push('/tablero/consejo');
  };
  return (
    <Container>
      <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <Row>
          <Col>
            <LoginFake
              accessRole="Secretaria"
              onClick={redirectToSecretaryHandler}
            />
          </Col>
          <Col>
            <LoginFake
              accessRole="Consejo de postulación"
              onClick={redirectToResponsableHandler}
            />
          </Col>
        </Row>

      </div>
    </Container>

  );
};

export default LoginPage;
