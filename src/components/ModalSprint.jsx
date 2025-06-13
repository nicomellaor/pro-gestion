import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function ModalSprint({agregarFila, cambiarFila, eliminarFila, show, handleClose, agregando, borrando, data}){
    const [inicio,setInicio] = useState("");
    const [fin,setFin] = useState("");
    const [id,setId] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (show && data && !agregando) {
            setId(data.id || "");
            setInicio(data.inicio || "");
            setFin(data.fin || "");
        }
    }, [show, data, agregando]);

    useEffect(() => {
        if (show && agregando) {
            resetDatos();
        }
    }, [show, agregando]);

    const titulo = () => {
        if (borrando) return "Borrar Sprint";
        if (agregando) return "Agregar Sprint";
        else return "Modificar Sprint";
    };

    const resetDatos = () => {
        setId("");
        setInicio("");
        setFin("");
        setErrors({});
    };

    const validarDatos = () => {        
        const newErrors = {};
        if (!id) {
            newErrors.id = "El ID es requerido";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validarDatos()) {
            return;
        }

        const datos = {id: id, inicio: inicio, fin: fin}

        if(agregando){
            agregarFila(datos);
        } else {
            cambiarFila(datos);
        }
        handleModalClose();
    }

    const handleDelete = () => {
        if (!validarDatos()) {
            return;
        }

        eliminarFila(id);
        handleModalClose();
    };

    const handleModalClose = () => {
        resetDatos();
        handleClose();
    };

    return(
        <Modal show={show} onHide={handleModalClose} data-bs-theme="dark">
            <Modal.Header closeButton>
                <Modal.Title>{titulo()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { agregando ? (
                    <div>
                        <InputGroup className="mb-3">
                            <Form.Control 
                                placeholder="ID"
                                value={id}
                                type="number"
                                min={1}
                                onChange={(e) => setId(e.target.value)}
                                isInvalid={!!errors.id}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.id}
                            </Form.Control.Feedback>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Fecha Inicio</InputGroup.Text>
                            <Form.Control
                                type="date"
                                value={inicio}
                                aria-label="Fecha"
                                onChange={(e) => setInicio(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Fecha Término</InputGroup.Text>
                            <Form.Control
                                type="date"
                                value={fin}
                                aria-label="Fecha"
                                onChange={(e) => setFin(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                ) : (
                    borrando ? (
                        <div>
                            <p>
                                <i className="bi bi-exclamation-triangle-fill me-2"></i> 
                                ¿Está seguro que desea eliminar el Sprint #{id}?
                            </p>
                        </div>
                    ) : (
                        <div>
                            <InputGroup className="mb-3">
                                <Form.Control 
                                    placeholder="ID"
                                    type="number"
                                    min={1}
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    isInvalid={!!errors.id}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.id}
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Fecha Inicio</InputGroup.Text>
                                <Form.Control
                                    type="date"
                                    value={inicio}
                                    aria-label="Fecha"
                                    onChange={(e) => setInicio(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Fecha Término</InputGroup.Text>
                                <Form.Control
                                    type="date"
                                    value={fin}
                                    aria-label="Fecha"
                                    onChange={(e) => setFin(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    )
                )}
            </Modal.Body>
            <Modal.Footer>
                { agregando ? (
                    <div>
                        <Button variant="secondary" onClick={handleModalClose} className="me-3">Cancelar</Button>
                        <Button variant="primary" onClick={handleSave}> <i className="bi bi-floppy"></i> Guardar</Button>
                    </div>
                ) : ( borrando ? (
                    <div>
                        <Button variant="secondary" onClick={handleModalClose} className="me-3">Cancelar</Button>
                        <Button variant="danger" onClick={handleDelete}> <i className="bi bi-trash"></i> Eliminar</Button>
                    </div>
                ) : (
                    <div>
                        <Button variant="secondary" onClick={handleModalClose} className="me-3">Cancelar</Button>
                        <Button variant="primary" onClick={handleSave}> <i className="bi bi-floppy"></i> Guardar</Button>
                    </div>
                ))}
            </Modal.Footer>
        </Modal>
    )
}