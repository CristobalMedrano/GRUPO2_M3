import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Container,
} from 'react-bootstrap';
import LoginIcon from 'mdi-react/LoginIcon';
import AccountIcon from 'mdi-react/AccountIcon';
import HomeIcon from 'mdi-react/HomeIcon';
import HeaderLogo from './HeaderLogo';
import './Header.css';

export default function Header() {
  return (
    <>
      <div style={{ display: 'flex', height: '12px' }}>
        <div style={{ width: '35%', backgroundColor: '#06487F' }}>{' '}</div>
        <div style={{ width: '65%', backgroundColor: '#EA8232' }}>{' '}</div>
      </div>
      <Navbar sticky="top" variant="light" style={{ backgroundColor: '#fff', borderBottom: '1px solid #EEEEEE' }}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <HeaderLogo />
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link style={{ color: 'white' }}>
                <div
                  className="customLink"
                  style={{
                    display: 'flex', alignItems: 'center', fontSize: '1em',
                  }}
                >
                  <HomeIcon style={{ marginRight: '0.3em' }} />
                  Inicio
                </div>
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Nav.Item>
              <LinkContainer to="/tablero/secretaria">
                <Nav.Link style={{ color: 'white' }}>
                  <div style={{ diplay: 'flex', alignItems: 'center' }}>
                    <AccountIcon style={{ marginRight: '0.3em' }} />
                    Secretaria
                  </div>
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/tablero/consejo">
                <Nav.Link style={{ color: 'white' }}>
                  <div style={{ diplay: 'flex', alignItems: 'center' }}>
                    <AccountIcon style={{ marginRight: '0.3em' }} />
                    Consejo de Postulación
                  </div>
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/iniciar-sesion">
                <Nav.Link style={{ color: 'white' }}>
                  <div style={{ diplay: 'flex', alignItems: 'center' }}>
                    <LoginIcon style={{ marginRight: '0.3em' }} />
                    Iniciar Sesión
                  </div>
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
