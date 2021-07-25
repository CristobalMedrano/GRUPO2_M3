import React from 'react';
import {
  Button, Card, Container, Row, Col,
} from 'react-bootstrap';
import './LoginFake.css';
import AccountKeyOutlineIcon from 'mdi-react/AccountKeyOutlineIcon';

const LoginFake = (props) => {
  const { accessRole } = props;

  const onSubmitHandler = () => {
    props.onClick(accessRole);
  };

  return (
    <Button
      variant="login"
      onClick={onSubmitHandler}

    >
      <Card style={{
        backgroundColor: 'transparent', border: 'none',
      }}
      >

        <Card.Header style={{ border: 'none', backgroundColor: 'transparent' }}>
          <Card.Title style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E86A35', fontSize: '1.6em', backgroundColor: 'transparent',
          }}
          >
            Iniciar Sesión
          </Card.Title>
        </Card.Header>
        <hr style={{
          marginLeft: '1em', marginRight: '1em', marginTop: '0.5em', marginBottom: '0.5em', color: '#114A7D',
        }}
        />
        <Card.Body>
          <Container>
            <Row>
              <Col style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#114A7D', fontSize: '1.6em', fontWeight: 'bold', backgroundColor: 'transparent',
              }}
              >
                <div>
                  <AccountKeyOutlineIcon size="1.5em" />
                </div>
                <div>
                  {accessRole}
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Button>
  );
};

export default LoginFake;
