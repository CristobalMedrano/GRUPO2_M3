import React from 'react';
import { Card } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';
import './DiplomateMenuCard.css';
import CheckboxOutlineIcon from 'mdi-react/CheckBoxOutlineIcon';
import SchoolOutlineIcon from 'mdi-react/SchoolOutlineIcon';
import AccountMultipleOutlineIcon from 'mdi-react/AccountMultipleOutlineIcon';
import CurrencyUsd from 'mdi-react/CurrencyUsdIcon';
import AccoutCheckOutline from 'mdi-react/AccountCheckOutlineIcon';
import ConctactIcon from 'mdi-react/AccountOutlineIcon';
import AccountArrowRightOutline from 'mdi-react/AccountArrowRightOutlineIcon';
import ArrowLeftIcon from 'mdi-react/ArrowLeftBoldOutlineIcon';

const DiplomateMenuCard = (props) => {
  const { id } = props;
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };
  return (
    <Card
      style={{
        border: 'none', borderRadius: '10px', backgroundColor: '#F4F8FB', borderTop: '10px solid #0C497E', paddingTop: '1em',
      }}
    >
      <Link className="btn-diplomate-link" to="/#listado-diplomados" smooth scroll={(el) => scrollWithOffset(el)}>
        <ArrowLeftIcon style={{ marginRight: '0.5em' }} />
        Volver
      </Link>
      <Link className="btn-diplomate-link" to={`/diplomado/${id}#objetivos-y-descripcion`} smooth scroll={(el) => scrollWithOffset(el)}>
        <CheckboxOutlineIcon style={{ marginRight: '0.5em' }} />
        Objetivos y Descripción
      </Link>
      <Link className="btn-diplomate-link" to={`/diplomado/${id}#plan-de-estudios`} smooth scroll={(el) => scrollWithOffset(el)}>
        <SchoolOutlineIcon style={{ marginRight: '0.5em' }} />
        Plan de estudios
      </Link>
      <Link className="btn-diplomate-link" to={`/diplomado/${id}#cuerpo-docente`} smooth scroll={(el) => scrollWithOffset(el)}>
        <AccountMultipleOutlineIcon style={{ marginRight: '0.5em' }} />
        Cuerpo docente
      </Link>
      <Link className="btn-diplomate-link" to={`/diplomado/${id}#aranceles`} smooth scroll={(el) => scrollWithOffset(el)}>
        <CurrencyUsd style={{ marginRight: '0.5em' }} />
        Aranceles
      </Link>
      <Link className="btn-diplomate-link" to={`/diplomado/${id}#admision`} smooth scroll={(el) => scrollWithOffset(el)}>
        <AccoutCheckOutline style={{ marginRight: '0.5em' }} />
        Admisión
      </Link>
      <Link className="btn-diplomate-link" to={`/diplomado/${id}#contacto`} smooth scroll={(el) => scrollWithOffset(el)}>
        <ConctactIcon style={{ marginRight: '0.5em' }} />
        Contacto
      </Link>
      <Link className="btn-diplomate-link mb-3" to={`/diplomado/${id}#inscripciones`} smooth scroll={(el) => scrollWithOffset(el)}>
        <AccountArrowRightOutline style={{ marginRight: '0.5em' }} />
        Inscripciones
      </Link>
    </Card>
  );
};

export default DiplomateMenuCard;
