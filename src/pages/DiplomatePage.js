/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Spinner, Button, Card,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Sticky, StickyContainer } from 'react-sticky';
import Notification from '../components/app/Notification';
import DiplomateCard from '../components/diplomate/DiplomateCard';
import DiplomateMenuCard from '../components/diplomate/DiplomateMenuCard';

const DiplomatePage = () => {
  const { diplomadoId } = useParams();
  const [diplomate, setDiplomate] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  // const [modalShow, setModalShow] = React.useState(false);
  useEffect(async () => {
    try {
      setIsLoading(true);
      const res = await axios({ method: 'GET', url: `http://${process.env.REACT_APP_IP_HOST ? process.env.REACT_APP_IP_HOST : 'localhost'}:8081/api/v1/diplomates/${diplomadoId}` });
      setDiplomate(res.data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line
        console.log(error);
    }
  }, []);

  const getContactHandler = async (payload) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    console.log(payload);
    try {
      // eslint-disable-next-line
      console.log("enviando...");
      await axios.post(`http://${process.env.REACT_APP_IP_HOST ? process.env.REACT_APP_IP_HOST : 'localhost'}:8081/api/v1/postulants`, payload, { headers });
      setMessage('¡Tu solicitud de contacto ha sido enviada!.');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setMessage('');
      }, 4000);
      console.log('enviado!');
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  const getInscriptionHandler = async (payload) => {
    console.log(payload);
    console.log('Llamada al backend de la Inscripción');
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      // eslint-disable-next-line
      console.log("enviando...");
      await axios.post(`http://${process.env.REACT_APP_IP_HOST ? process.env.REACT_APP_IP_HOST : 'localhost'}:8082/api/v1/diplomates/${diplomadoId}/postulations`, payload, { headers });
      setMessage('¡Tu solicitud de inscripción ha sido enviada!.');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setMessage('');
      }, 4000);
      console.log('enviado!');
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  const syllabus = [{
    numberCoursesDuration: [
      'El diplomado está estructurado en 6 módulos y 180 horas cronológicas.',
      'Horario: Lunes a jueves de 19:00 a 22:00 horas.',
      'Modalidad: On-Line'],
    programCourses: [
      'Fundamentos de ciencia de datos.',
      'Programación en la ciencia de datos.',
      'Big data.',
      'Análisis exploratorio de datos.',
      'Modelamiento basado en datos.',
      'Proyecto de ciencia de datos aplicados.',
    ],
    approbalRequirements: [
      'Aprobar todos los cursos del diplomado',
      'Asistencia de un 75% a las horas de clase de cada curso del diplomado.',
      'Nota mínima 4,0 (en escala de 1,0 a 7,0) para cada curso del diplomado.'],
  }];

  const academic = [{
    name: 'Manuel Villalobos-Cid (Académico, DIINF)',
    image: 'https://i1.rgstatic.net/ii/profile.image/708490398031879-1545928682561_Q512/Manuel-Villalobos-Cid.jpg',
    curriculum: ['Doctorado en Ciencias de la Ingeniería con Mención Informática, Universidad de Santiago de Chile',
      'Ingeniero Biomédico, Universidad de Valparaíso.'],
  },
  {
    name: 'Felipe-Andrés Bello Robles (Académico, DIINF)',
    image: 'https://www.informatica.usach.cl/multimedia/fbello-1.jpg',
    curriculum: ['Doctor en Ciencias de la Ingeniería con mención en Informática, Universidad de Santiago de Chile.',
      'Magíster en Ingeniería Informática, Universidad de Santiago de Chile.', 'Ingeniero Civil Informático, Universidad de Santiago de Chile.'],
  },
  {
    name: 'Carolina Bonacic Castro (Académica, DIINF)',
    image: 'https://www.postgrado.usach.cl/sites/default/files/bonacic_0.jpg',
    curriculum: ['Doctor en Ciencias de la Ingeniería con mención en Informática, Universidad de Santiago de Chile.',
      'Magíster en Ingeniería Informática, Universidad de Santiago de Chile.', 'Ingeniero Civil Informático, Universidad de Santiago de Chile.'],
  },
  {
    name: 'Diego Caro Alarcón (Académico, DIINF)',
    image: 'https://fing.usach.cl/sites/ingenieria/files/styles/noticia_mobile/public/field/noticia_image/academico_diego_caro_diinf.jpg?itok=5AaVWqG2',
    curriculum: ['Doctor en Ciencias de la Computación, Universidad de Concepción.',
      'Ingeniero Civil Informático, Universidad de Concepción.'],
  },
  {
    name: 'Mario Inostroza Ponta (Académico, DIINF)',
    image: 'https://www.usach.cl/sites/default/files/field/noticia_image/mario_inostroza-3.jpg',
    curriculum: ['PhD in Computer Science, The University of Newcastle.',
      'Magíster en Ingeniería Informática, Universidad de Santiago de Chile.',
      'Ingeniero Civil en Informática, Universidad de Santiago de Chile.',
    ],
  },
  {
    name: 'Mauricio Marín Caihuán (Académico, DIINF)',
    image: 'https://viejo.cebib.cl/wp-content/uploads/2015/11/MM.jpg',
    curriculum: ['PhD in Computer Science, University of Oxford.',
      'Magister Ciencias de la Computación , Universidad de Chile.',
      'Ingeniero de Ejecución en Electricidad, Universidad de Magallanes.',
    ],
  },
  {
    name: 'Roberto González Ibáñez (Académico, DIINF)',
    image: 'https://i.ytimg.com/vi/DrG2aAkNNCY/maxresdefault.jpg',
    curriculum: ['PhD in Communication, Information, and Library Studies, Rutgers University.',
      'Magíster en Ingeniería Informática, Universidad de Santiago de Chile.',
      'Ingeniero Civil Informático, Universidad de Santiago de Chile.',
    ],
  }];

  const duty = [{
    duty: [
      'El valor total del diplomado asciende a $2.900.000 (valor año 2021, 1° Semestre).',
      'Derecho de inscripción por un valor de $63.000.',
      'Este diplomado no está adscrito a código SENCE.',
      'Este diplomado no está adscrito a convenio marco.'],
    discounts: [
      'Pago al contado (25%)',
      'Ex alumno pregrado USACH (15%)',
      'Ex alumno diplomados DIINF (15%)',
      'Ex alumno diplomados USACH (10%)',
      'Socios activos AGI (15%)',
      'Funcionario público (10%)',
    ],
  }];

  const admission = [{
    entryRequirements: [
      'Título profesional o Certificado de Egreso (original entregado por la institución de educación superior o fotocopia legalizada ante notario).',
      'Certificado de nacimiento.',
      'Copia de Cédula de identidad (escaneado por ambos lados).',
      'Currículum Vitae.',
      'Ficha de inscripción.',
    ],
    datesStudy: [
      'Fecha de inicio: Semana 19 Abril 2021',
      'Horario: Lunes a jueves 19:00 a 22:00 horas',
      'Modalidad: El diplomado se dictará en modalidad On-Line.'],
  }];

  return (
    <>
      { !isLoading && (
      <div
        id="inicio"
        style={{
          position: 'relative',
        }}
      >
        <img
          src={diplomate.image}
          style={{
            width: '100%', height: '250px', objectFit: 'cover', opacity: 0.1,
          }}
          alt={diplomate.title}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <h1
            className="noselect"
            style={{
              textAlign: 'center', fontSize: '1.2em', marginTop: '-1em', marginBottom: '0px',
            }}
          >
            Departamento de Ingeniería Informática
          </h1>
          <h2 className="noselect" style={{ textAlign: 'center', fontSize: '3em', color: '#E86A35' }}>
            { diplomate.title}
          </h2>
        </div>
      </div>
      )}
      { isLoading && (
      <div style={{
        borderRadius: '10px 10px 0px 0px',
        height: '500px',
        width: '100%',
        objectFit: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Spinner animation="border" style={{ height: '5em', width: '5em', color: '#E68041' }} />
      </div>
      )}
      { !isLoading && (
      <StickyContainer>
        <Container>
          <Row>
            <Col
              sm={2}
              style={{ marginTop: '-2em' }}
            >
              <Sticky topOffset={-90}>
                {({ style, isSticky }) => (
                  <div style={{ ...style, isSticky, top: `${90 + style.top}px` }}>
                    <DiplomateMenuCard id={diplomate.id} />
                  </div>
                )}
              </Sticky>
            </Col>
            <Col>

              <DiplomateCard
                key={diplomate.id}
                id={diplomate.id}
                title={diplomate.title}
                objectives={diplomate.description}
                syllabus={syllabus}
                teachersCouncil={academic}
                duty={duty}
                admission={admission}
                onClickContact={getContactHandler}
                onClickInscription={getInscriptionHandler}
              />

            </Col>
          </Row>
        </Container>
      </StickyContainer>
      )}
      <Notification
        show={showModal}
        message={message}
        onHide={() => { setShowModal(false); }}
      />
    </>

  );
};

export default DiplomatePage;
