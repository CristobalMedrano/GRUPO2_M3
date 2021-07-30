/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import ArrowRightIcon from 'mdi-react/ArrowRightIcon';

const PostulationCardDocumentView = (props) => {
  // eslint-disable-next-line no-unused-vars
  const {
    documentIcon, documentName, documentUrl, show, onHide,
  } = props;
  const [numPages, setNumPages] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = (pdf) => {
    setLoading(false);
    setNumPages(pdf.numPages);
  };

  return (
    <Modal
      show={show}
      size="lg"
      centered
      backdrop="static"
    >
      <Modal.Header style={{ border: 'none', fontWeight: 'bold' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '0.5em' }}>
            {documentIcon}
          </div>
          {documentName}
        </div>
      </Modal.Header>
      {loading && (
      <hr style={{
        marginTop: '0em', marginBottom: '0em', marginLeft: '1em', marginRight: '1em',
      }}
      />
      )}
      <Modal.Body style={{ display: 'flex', justifyContent: 'center', backgroundColor: loading ? 'transparent' : '#C0C0C0' }}>
        <Document
          file={documentUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          error={<p className="text-center" style={{ color: 'red', fontWeight: 'bold', marginTop: '1em' }}>Error al cargar el documento</p>}
          loading={() => setLoading(true)}
          noData={<p className="text-center" style={{ fontWeight: 'bold', marginTop: '1em' }}>No existe el documento.</p>}
          renderMode="svg"
        >
          <Page pageNumber={pageNumber} scale={1.0} width={750} />
        </Document>
        {loading && <p className="text-center" style={{ fontWeight: 'bold', marginTop: '1em' }}>Cargando documento...</p>}
      </Modal.Body>

      <Modal.Footer style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '1em', marginRight: '1em',
      }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            disabled={pageNumber === 1 || loading}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            <ArrowLeftIcon />

          </Button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {!loading
      && (
      <p style={{
        display: 'flex', alignItems: 'center', marginLeft: '1em', marginRight: '1em', marginBottom: '0em',
      }}
      >
        Página
        {' '}
        {pageNumber}
        {' '}
        de
        {' '}
        {numPages}
      </p>
      )}
          </div>
          <Button
            disabled={pageNumber === numPages || loading}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            <ArrowRightIcon />
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outline-danger" onClick={onHide}>Cerrar</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PostulationCardDocumentView;
