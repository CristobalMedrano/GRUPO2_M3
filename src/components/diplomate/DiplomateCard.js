import React, { useState } from 'react';
import {
  Button, Card, Row, Col,
} from 'react-bootstrap';
import './DiplomateCard.css';
import CheckboxOutlineIcon from 'mdi-react/CheckBoxOutlineIcon';
import SchoolOutlineIcon from 'mdi-react/SchoolOutlineIcon';
import AccountMultipleOutlineIcon from 'mdi-react/AccountMultipleOutlineIcon';
import CurrencyUsd from 'mdi-react/CurrencyUsdIcon';
import AccoutCheckOutline from 'mdi-react/AccountCheckOutlineIcon';
import DiplomateCardAcademic2 from './DiplomateCardAcademic2';
import DiplomateCardContent from './DiplomateCardContent';
import DiplomateCardTitle from './DiplomateCardTitle';
import DiplomateCardSyllabusList from './DiplomateCardSyllabusList';
import DiplomateCardDutyList from './DiplomateCardDutyList';
import DiplomateCardAdmissionList from './DiplomateCardAdmissionList';
import PostulantMoreInfoForm from '../postulant/PostulantMoreInfoForm';
import PostulantInscriptionForm from '../postulant/PostulantInscriptionForm';

const DiplomateCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showInscriptionModal, setShowInscriptionModal] = useState(false);
  const {
    id, title, objectives, syllabus, teachersCouncil, duty, admission,
  } = props;

  const submitContactHandler = async (payload) => {
    await props.onClickContact({ id_diplomate: id, ...payload });
    setShowModal(false);
  };

  const submitInscriptionHandler = async (payload) => {
    await props.onClickInscription(payload);
    setShowInscriptionModal(false);
  };

  const diplomateCardsAcademic = teachersCouncil.map((academic, index) => (
    <Col sm={12} md={12} lg={6} style={{ marginBottom: '24px' }}>
      <DiplomateCardAcademic2
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        name={academic.name}
        image={academic.image}
        curriculum={academic.curriculum}
      />
    </Col>
  ));

  return (
    <div key={id} className="mb-4" style={{ marginTop: '-2em' }}>
      <Card
        key={id}
        className="h-100"
        style={{
          border: 'none', borderRadius: '10px', backgroundColor: '#F4F8FB', borderTop: '10px solid #0C497E', paddingTop: '1em',
        }}
      >
        <DiplomateCardTitle title="Objetivos y Descripción" icon={<CheckboxOutlineIcon style={{ marginRight: '0.5em' }} />} />
        <DiplomateCardContent content={objectives} />
        <DiplomateCardTitle title="Plan de estudios" icon={<SchoolOutlineIcon style={{ marginRight: '0.5em' }} />} />
        <DiplomateCardSyllabusList
          numberCoursesDuration={syllabus[0].numberCoursesDuration}
          programCourses={syllabus[0].programCourses}
          approbalRequirements={syllabus[0].approbalRequirements}
        />
        <DiplomateCardTitle title="Cuerpo docente" icon={<AccountMultipleOutlineIcon style={{ marginRight: '0.5em' }} />} />
        <Row style={{ paddingLeft: '1.5em', paddingRight: '1.5em' }}>
          <p>
            El cuerpo docente se compone de auditores e ingenieros de alto
            nivel académico o profesionales de reconocido prestigio y experiencia laboral.
          </p>
          {diplomateCardsAcademic}
        </Row>
        <DiplomateCardTitle title="Aranceles" icon={<CurrencyUsd style={{ marginRight: '0.5em' }} />} />
        <DiplomateCardDutyList duty={duty[0].duty} discounts={duty[0].discounts} />
        <DiplomateCardTitle title="Admisión" icon={<AccoutCheckOutline style={{ marginRight: '0.5em' }} />} />
        <DiplomateCardAdmissionList
          entryRequirements={admission[0].entryRequirements}
          datesStudy={admission[0].datesStudy}
        />
        <DiplomateCardTitle title="Contacto" icon={<AccoutCheckOutline style={{ marginRight: '0.5em' }} />} />
        <p style={{ paddingLeft: '1.5em', paddingRight: '1.5em' }}>
          Puedes ingresar tus datos a través de nuestro formulario de contacto o directamente
          a los siguientes correos:
        </p>
        <Row>
          <Col>
            <div style={{
              display: 'flex', padding: '0 1em 1em 1em', alignItems: 'center', justifyContent: 'space-evenly',
            }}
            >
              <div
                style={{
                  display: 'flex', padding: '0 1em 1em 1em',
                }}
              >
                <div>
                  <div>
                    ¿Necesitas más información?
                  </div>
                  <Button variant="card" style={{ width: '100%' }} onClick={() => { setShowModal(true); }}>Contáctanos</Button>
                </div>
              </div>
              <div style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                <p style={{ fontWeight: 'bold' }}>Coordinador</p>
                <p>
                  Dr. Manuel Villalobos Cid
                  <br />
                  manuel.villalobos@usach.cl
                </p>
                <p style={{ fontWeight: 'bold' }}>
                  Secretaria Diplomados
                </p>
                <p>
                  Romina Labrin Valenzuela
                  <br />
                  Mail: romina.labrin@usach.cl
                  <br />
                  Fono: 22 71 80 905
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <DiplomateCardTitle title="Inscripciones" icon={<AccoutCheckOutline style={{ marginRight: '0.5em' }} />} />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}>
          ¿Te interesa el&nbsp;
          <div style={{ fontWeight: 'bold', color: '#0C497E' }}>
            {title}
          </div>
          ?
        </div>
        <div
          style={{
            display: 'flex', padding: '0 1em 1em 1em',
          }}
        >
          <Button variant="card" style={{ width: '100%' }} onClick={() => { setShowInscriptionModal(true); }}>¡Postular!</Button>

        </div>
      </Card>
      <PostulantMoreInfoForm
        title={title}
        show={showModal}
        onHide={() => { setShowModal(false); }}
        onSubmitPostulantForm={submitContactHandler}
      />
      <PostulantInscriptionForm
        title={title}
        show={showInscriptionModal}
        onHide={() => { setShowInscriptionModal(false); }}
        onSubmitPostulantInscriptionForm={submitInscriptionHandler}
      />
    </div>
  );
};

export default DiplomateCard;
