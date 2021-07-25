import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';

const PostulationCardDocumentView = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { document, show, onHide } = props;
  const [numPages, setNumPages] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = () => {
    setNumPages(numPages);
  };

  return (
    <Modal
      show={show}
      size="lg"
      centered
      backdrop="static"
    >
      <Document
        file={document}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} width={600} />
      </Document>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostulationCardDocumentView;
