import { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

export default function LogIn() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        if (formElement.checkValidity() === false) {
            event.stopPropagation();
        } else {
            //onSubmit(form);
            console.log('Form submitted successfully:', form);
            navigate('/');
        }
        setValidated(true);
    };

    return (
        <>
            <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
                <Row className="w-100 justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                        <h1 className="display-4 fw-bold text-white text-center mb-3">🚀<br></br>¡Bienvenido a <br></br>Pro-Gestión!</h1>
                        <p className="fs-5 text-center mb-4">Todos tus proyectos ágiles en un solo lugar</p>
                        <Card className="column-custom-bg border-0" data-bs-theme="dark">
                            <Card.Body className="p-5">
                                <h3 className="fw-bold text-white mb-4">Iniciar Sesión</h3>
                                <Form noValidate validated={validated} onSubmit={handleSubmit} data-bs-theme="dark">
                                    <Form.Group className="mb-3" controlId="validationUser">
                                        <Form.Label className="fw-semibold text-light">
                                            <i className="bi bi-person-fill me-2"></i>Usuario
                                        </Form.Label>
                                        <Form.Control 
                                            required 
                                            type="text" 
                                            placeholder="Ingresa tu usuario" 
                                            value={form.username} 
                                            onChange={(e) => setForm({...form, username: e.target.value})} 
                                            className="text-lowercase border-0"
                                            minLength={3}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            El nombre de usuario debe tener al menos 3 caracteres
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3" controlId="validationPassword">
                                        <Form.Label className="fw-semibold text-light">
                                            <i className="bi bi-lock-fill me-2"></i>Contraseña
                                        </Form.Label>
                                        <Form.Control 
                                            required 
                                            type="password" 
                                            placeholder="Ingresa tu contraseña" 
                                            value={form.password} 
                                            onChange={(e) => setForm({...form, password: e.target.value})} 
                                            className="border-0"
                                            minLength={6}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            La contraseña debe tener al menos 6 caracteres
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <div className="d-grid gap-3 my-4">
                                        <Button variant="primary" type="submit">
                                            <i className="bi bi-box-arrow-in-right me-2"></i>Ingresar
                                        </Button>
                                        <Button as={Link} to="/register" variant="outline-light" type="button">
                                            <i className="bi bi-person-plus me-2"></i>Crear Cuenta
                                        </Button>
                                        <Button variant="link">Olvidé mi contraseña</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}