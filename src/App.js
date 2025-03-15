import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Formulario from './components/formulario';
import Listado from './components/Listado';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/listado" element={<Listado/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
