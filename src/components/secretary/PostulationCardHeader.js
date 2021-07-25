import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import FileDocumentMultipleOutlineIcon from 'mdi-react/FileDocumentMultipleOutlineIcon';
import CardAccountDetailsOutlineIcon from 'mdi-react/CardAccountDetailsOutlineIcon';
import ArchiveCheckOutlineIcon from 'mdi-react/ArchiveOutlineIcon';
import OrderBoolAscendingVariantIcon from 'mdi-react/OrderBoolAscendingVariantIcon';

const PostulationCardHeader = (props) => {
  const { responsable } = props;
  return (
    <Card style={{
      border: 'none', borderRadius: '10px', backgroundColor: 'white', marginBottom: '0.5em', marginTop: '0.5em',
    }}
    >
      <Card.Body>
        <Row>
          <Col sm={2}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CardAccountDetailsOutlineIcon style={{ marginRight: '0.5em' }} />
              Identificador
            </div>
          </Col>
          <Col sm={responsable ? 6 : 4}>
            <div style={{ display: 'flex', alignItems: 'center' }} />
            <FileDocumentMultipleOutlineIcon style={{ marginRight: '0.5em' }} />
            Documentos
            <div style={{ display: 'flex', alignItems: 'center' }} />
          </Col>
          { responsable ? ''
            : (
              <Col sm={3}>
                <div style={{ display: 'flex', alignItems: 'center' }} />
                <ArchiveCheckOutlineIcon style={{ marginRight: '0.5em' }} />
                Estado de los documentos
                <div style={{ display: 'flex', alignItems: 'center' }} />
              </Col>
            )}

          <Col sm={responsable ? 4 : 3}>
            <div style={{ display: 'flex', alignItems: 'center' }} />
            <OrderBoolAscendingVariantIcon style={{ marginRight: '0.5em' }} />
            Estado de la postulación
            <div style={{ display: 'flex', alignItems: 'center' }} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PostulationCardHeader;
