import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const Notification = (props) => {
  const { show, onHide, message } = props;
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header style={{ border: 'none', display: 'flex', justifyContent: 'center' }}>
        <Modal.Title style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>{message}</Modal.Title>
        <Modal.Footer>
          <Button variant="success" onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal.Header>
    </Modal>
  );
};

export default Notification;
