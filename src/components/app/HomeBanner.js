import React from 'react';
import './HomeBanner.css';
import { Button } from 'react-bootstrap';
import diinfImage from '../../images/diinf.jpg';

const HomeBanner = () => (
  <div style={{
    position: 'relative',
  }}
  >
    <img
      className="noselect"
      src={diinfImage}
      style={{
        width: '100%', height: '500px', objectFit: 'cover', opacity: 0.15,
      }}
      alt="MDN Logo"
    />
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    >
      <h1 id="departamento" className="noselect" style={{ textAlign: 'center', fontSize: '1.2em', marginBottom: '0px' }}>Departamento de Ingeniería Informática</h1>
      <h2 id="title" className="noselect" style={{ textAlign: 'center', fontSize: '3em' }}>
        Educación Continua
      </h2>
      <h3 id="subtitle" className="noselect" style={{ textAlign: 'center', fontSize: '1em' }}>
        Diplomados que se cursan entre Marzo y Enero de cada año en Jornada Vespertina.
      </h3>
      <div className="text-center mt-4 noselect">
        <Button variant="flat">¡INSCRÍBETE AHORA!</Button>
      </div>

    </div>
  </div>
);

export default HomeBanner;
