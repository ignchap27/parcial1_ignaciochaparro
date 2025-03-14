import './Formulario.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Formulario(){
    const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();


  const validatePassword = (pwd) => {
    if (pwd.length < 9) return "La contraseña debe tener al menos 9 caracteres";
    if (!(/[A-Za-z]/.test(pwd) && /[0-9]/.test(pwd)))
      return "La contraseña debe contener letras y números";
    return "";
  };

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setFormValues({ ...formValues, password: pwd });
    const error = validatePassword(pwd);
    setPasswordError(error);
  };

  const clickSubmit = () => {
    // Validación sencilla: el correo debe contener "@" y "."
    if (formValues.email.indexOf('@') === -1 || formValues.email.indexOf('.') === -1) {
      setEmailError("Por favor, ingrese un correo electrónico válido");
      return;
    }
    if (passwordError) return;
    navigate("/listado");
  };

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
          {emailError 
            ? <Form.Text className="text-danger">{emailError}</Form.Text>
            : <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
          {passwordError 
          ? <Form.Text className="text-danger">{passwordError}</Form.Text>
          : <Form.Text className="text-muted">
              Your password should have numbers and letters and should be at least 9 characters long
            </Form.Text>}
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Formulario;