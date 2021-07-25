import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import PostulantPage from './pages/PostulantPage';
import SecretaryPage from './pages/SecretaryPage';
import PostulantMoreInfoPage from './pages/PostulantMoreInfoPage';
import DiplomatePage from './pages/DiplomatePage';
import Header from './components/app/Header';
import Footer from './components/app/Footer';
import ScrollToTop from './components/app/ScrollToTop';
import LoginPage from './pages/LoginPage';
import DashboardSecretary from './pages/DashboardSecretary';
import DashboardResponsable from './pages/DashboardResponsable';
import HomePage from './pages/HomePage';
import DashboardSecretaryPostulations from './pages/DashboardSecretaryPostulations';
import DashboardResponsablePostulations from './pages/DashboardResponsablePostulations';

function App() {
  /* const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', '1');
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  }; */

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <div style={{ minHeight: 'calc(100vh - 230px)' }}>
        <Redirect
          from="/"
          to="/inicio"
        />
        <Switch>
          <Route exact path="/inicio" component={HomePage} />
          <Route exact path="/tablero/secretaria" component={DashboardSecretary} />
          <Route exact path="/tablero/secretaria/diplomado/:diplomadoId" component={DashboardSecretaryPostulations} />
          <Route exact path="/tablero/consejo" component={DashboardResponsable} />
          <Route exact path="/tablero/consejo/diplomado/:diplomadoId" component={DashboardResponsablePostulations} />
          <Route exact path="/iniciar-sesion" component={LoginPage} />
          <Route exact path="/postular" component={PostulantPage} />
          <Route exact path="/secretaria" component={SecretaryPage} />
          <Route exact path="/diplomado/:diplomadoId" component={DiplomatePage} />
          <Route exact path="/postular" component={PostulantMoreInfoPage} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
