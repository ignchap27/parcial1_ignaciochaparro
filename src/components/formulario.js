import './Formulario.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Formulario(){
    const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
    const [loginError , setLoginError] = useState("");
    const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
    setLoginError("");
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setFormValues({ ...formValues, password: pwd });
    setLoginError("");
  };

  const cancelForms = () => {
    setFormValues({ email: "", password: ""});
    setLoginError("");
  }

  const clickSubmit = async () => {
    // Basic validation
    if (!formValues.email || !formValues.password) {
      setLoginError('Por favor ingrese usuario y contraseña');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: formValues.email,
          password: formValues.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Login successful
        console.log(data.message)
        navigate('/listado');
      } else {
        // Login failed
        setLoginError('Credenciales de acceso incorrectas');
        console.log(data.message);
      }
    } catch (error) {
      setLoginError('Error de conexión al servidor');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu usuario" onChange={handleEmailChange} value={formValues.email}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" onChange={handlePasswordChange} value={formValues.password}/>
        </Form.Group>

        {
          loginError && (
            <Form.Group>
              <p className="text-danger">{loginError}</p>
            </Form.Group>
          )
        }

        <div className="btn-container">
          <Button variant="primary" onClick={clickSubmit}>
            Ingresar
          </Button>
          <Button variant="danger" onClick={cancelForms}>
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Formulario;