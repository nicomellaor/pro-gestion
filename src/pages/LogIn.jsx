import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';

export default function LogIn() {
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
                            <Form data-bs-theme="dark">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="fw-semibold text-light"><i className="bi bi-person-fill me-2"></i>Usuario</Form.Label>
                                    <Form.Control type="text" placeholder="Ingresa tu usuario" className="border-0" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="fw-semibold text-light"><i className="bi bi-lock-fill me-2"></i>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Ingresa tu contraseña" className="border-0" />
                                </Form.Group>
                            </Form>
                            <div className="d-grid gap-3 mb-4">
                                    <Button variant="primary" type="submit">
                                        <i className="bi bi-box-arrow-in-right me-2"></i>Ingresar
                                    </Button>
                                    <Button variant="outline-light">
                                        <i className="bi bi-person-plus me-2"></i>Crear Cuenta
                                    </Button>
                                </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
    );
}