import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Formulario from './components/formulario';
import Listado from './components/Listado';
import Header from './components/Header';
import Footer from './components/Footer';
import { IntlProvider } from 'react-intl';
import localesMessages from './locales/es';
import localenMessages from './locales/en';
import React, {useState} from 'react'

function App() {

  const [locale, setLocale] = useState('es-ES'); // initial locale is Spanish

  const toggleLocale = () => {
    setLocale(locale === 'es-ES' ? 'en-US' : 'es-ES');
  };

  return (
      <Router>
        <IntlProvider locale={locale} messages={locale === 'es-ES' ? localesMessages : localenMessages}>
        <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}>
          <button onClick={toggleLocale}>
            {locale === 'es-ES' ? "Switch to English" : "Cambia a Español"}
          </button>
        </div> 
          <Header/>
          <Routes>
            <Route path="/" element={<Formulario />} />
            <Route path="/listado" element={<Listado/>} />
          </Routes>
          <Footer/>
        </IntlProvider>
      </Router>
  );
}

export default App;
