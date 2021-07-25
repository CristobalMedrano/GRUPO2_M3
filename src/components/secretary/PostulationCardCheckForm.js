/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Form, Button, Modal,
} from 'react-bootstrap';
import SaveIcon from 'mdi-react/ContentSaveIcon';
import EmailIcon from 'mdi-react/EmailIcon';
import AccountIcon from 'mdi-react/AccountIcon';
import TextAccountIcon from 'mdi-react/TextAccountIcon';
import './PostulationCardCheckForm.css';

const PostulationCardCheckForm = (props) => {
  const {
    postulationId,
    status,
    show,
    onHide,
    correctMessage,
    incorrectMessage,
    labelMessage,
    labelOptionMessage,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [checkedOption, setCheckedOption] = useState(false);

  useEffect(() => {
    setCheckedOption(status);
  }, []);

  const onCheckedOption1Handler = () => {
    setCheckedOption(true);
  };

  const onCheckedOption2Handler = () => {
    setCheckedOption(false);
  };

  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    await props.isCheckedOption(checkedOption);
    setIsLoading(false);
  }

  return (
    <Modal
      show={show}
      size="sm"
      centered
      backdrop="static"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header style={{ border: 'none' }}>
          <Modal.Title>
            <div style={{
              color: '#E86A35', marginBottom: 0, fontSize: '0.8em', fontWeight: 'normal',
            }}
            >
              <h6 style={{ margin: '0', padding: '0' }}>
                Postulación #
                {postulationId}
              </h6>

            </div>

            <div style={{
              color: '#0c497e', fontSize: '0.9em', fontWeight: 'bold',
            }}
            >
              <h5 style={{ margin: '0', padding: '0' }}>
                Editar
                {' '}
                {labelMessage}
              </h5>

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
                <Form.Label>{labelOptionMessage}</Form.Label>
                <Form.Group controlId="Operation">
                  <Form.Check
                    type="radio"
                    inline
                    checked={checkedOption}
                    label={correctMessage}
                    id="addOperation"
                    name="mathOperation"
                    onChange={onCheckedOption1Handler}
                  />
                  <Form.Check
                    type="radio"
                    inline
                    checked={!checkedOption}
                    label={incorrectMessage}
                    id="minusOperation"
                    name="mathOperation"
                    onChange={onCheckedOption2Handler}
                  />
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
            {isLoading ? 'Guardando...' : 'Guardar'}
            <SaveIcon style={{ marginLeft: '0.5em' }} size="1em" />
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>

  );
};

export default PostulationCardCheckForm;
