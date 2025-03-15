import './Formulario.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import {FormattedMessage, useIntl} from 'react-intl';

function Formulario(){
    const [formValues, setFormValues] = useState({ email: "", password: ""});
    const [loginError , setLoginError] = useState("");
    const navigate = useNavigate();
    const intl = useIntl();

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
      <h1><FormattedMessage id="Login"/></h1>
      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label><FormattedMessage id="Username"/></Form.Label>
          <Form.Control type="email" placeholder={intl.formatMessage({id:'Username'})} onChange={handleEmailChange} value={formValues.email}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label><FormattedMessage id="Password"/></Form.Label>
          <Form.Control type="password" placeholder={intl.formatMessage({id:'Password'})} onChange={handlePasswordChange} value={formValues.password}/>
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
            <FormattedMessage id="loginButton"/>
          </Button>
          <Button variant="danger" onClick={cancelForms}>
            <FormattedMessage id="cancelButton"/>
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Formulario;