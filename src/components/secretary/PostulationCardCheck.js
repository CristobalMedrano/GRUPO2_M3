import React, { useState } from 'react';
import {
  Col, Row, Button, Card,
} from 'react-bootstrap';
import CheckCircleOutlineIcon from 'mdi-react/CheckCircleOutlineIcon';
import CloseCircleOutlineIcon from 'mdi-react/CloseCircleOutlineIcon';
import AccountClockOutlineIcon from 'mdi-react/AccountClockOutlineIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import './PostulationCardCheck.css';
import PostulationCardCheckForm from './PostulationCardCheckForm';

const PostulationCardCheck = (props) => {
  const {
    disabled,
    id,
    status,
    statusInverse,
    correctMessage,
    incorrectMessage,
    iconButtonMessage,
    labelMessage,
    labelOptionMessage,
    buttonMessage,
    buttonMessage2,
  } = props;

  const [showModal, setShowModal] = useState(false);

  const onSendNotificationHandler = () => {
    props.onSendNotification(id);
  };

  const onEditStatusHandler = () => {
    setShowModal(true);
  };
  const onEditPostulationHandler = async (option) => {
    await props.onEditPostulation(option);
    setShowModal(false);
  };
  return (
    <>
      <Card className="h-100" style={{ borderRadius: '10px' }}>
        <Card.Header style={{
          backgroundColor: 'transparent',
          border: 'none',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingLeft: '0.5em',
          paddingRight: '0.5em',
        }}
        >
          <Button disabled={disabled} onClick={onEditStatusHandler} size="sm" variant="edit" style={{ display: 'flex', alignItems: 'center' }}>
            <PencilIcon size="1em" style={{ marginRight: '0.5em' }} />
            Editar
          </Button>
        </Card.Header>
        <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Row>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              {status ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {disabled ? <AccountClockOutlineIcon size="3em" />
                    : <CheckCircleOutlineIcon size="3em" />}
                  {disabled ? 'Pendiente' : correctMessage}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {disabled ? <AccountClockOutlineIcon size="3em" />
                    : <CloseCircleOutlineIcon size="3em" />}
                  {disabled ? 'Pendiente' : incorrectMessage}
                </div>
              )}
            </Col>
          </Row>

        </Card.Body>
        <Card.Footer style={{ backgroundColor: 'transparent', border: 'none' }}>
          <Row>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              {statusInverse ? (
                <Button
                  disabled={!status || disabled}
                  onClick={onSendNotificationHandler}
                  variant="card"
                  style={{
                    marginBottom: '0.5em',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  {iconButtonMessage}
                  {disabled ? buttonMessage2 : buttonMessage}
                </Button>
              ) : (
                <Button
                  disabled={status || disabled}
                  onClick={onSendNotificationHandler}
                  variant="card"
                  style={{

                    marginBottom: '0.5em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  {iconButtonMessage}
                  {disabled ? buttonMessage2 : buttonMessage}
                </Button>
              )}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      <PostulationCardCheckForm
        key={id}
        show={showModal}
        onHide={() => { setShowModal(false); }}
        status={status}
        postulationId={id}
        correctMessage={correctMessage}
        incorrectMessage={incorrectMessage}
        labelMessage={labelMessage}
        labelOptionMessage={labelOptionMessage}
        isCheckedOption={onEditPostulationHandler}
      />
    </>
  );
};

export default PostulationCardCheck;
