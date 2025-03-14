import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Formulario from './components/formulario';
import Listado from './components/Listado';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/listado" element={<Listado/>} />
      </Routes>
    </Router>
  );
}

export default App;
