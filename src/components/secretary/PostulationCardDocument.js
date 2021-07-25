import React, { useState } from 'react';
import {
  Col, Row, Button,
} from 'react-bootstrap';
import FileDocumentOutlineIcon from 'mdi-react/FileDocumentOutlineIcon';
import PostulationCardDocumentView from './PostulationCardDocumentView';
import './PostulationCardDocument.css';

const PostulationCardDocument = (props) => {
  const { documentName, documentUrl } = props;
  const [showModal, setShowModal] = useState(false);

  const onClickDocumentHandler = () => {
    setShowModal(true);
    props.onClickDocument(documentUrl);
  };

  return (
    <>
      <Button variant="document" className="mb-1" style={{ width: '100%' }} onClick={onClickDocumentHandler}>
        <Row>
          <Col sm={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FileDocumentOutlineIcon />
          </Col>
          <Col sm={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {documentName}
          </Col>
        </Row>
      </Button>
      <PostulationCardDocumentView
        show={showModal}
        onHide={() => { setShowModal(false); }}
        document={documentUrl}
      >
        <h1>hola</h1>
      </PostulationCardDocumentView>
    </>
  );
};

export default PostulationCardDocument;
