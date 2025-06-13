import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function ModalTabla({ agregarFila, cambiarFila, borrando, agregando, show, handleClose, eliminarFila }){
    const [id,setId] = useState("");
    const [historia,setHistoria] = useState("");
    const [prioridad,setPrioridad] = useState("");
    const [puntos,setPuntos] = useState("");
    const [criterios,setCriterios] = useState("");
    const [errors, setErrors] = useState({});

    const titulo = () => {
        if (borrando) return "Borrar Historia";
        if (agregando) return "Agregar Historia";
        else return "Modificar Historia";
    };

    const resetFormulario = () => {
        setId("");
        setHistoria("");
        setPrioridad("");
        setPuntos("");
        setCriterios("");
        setErrors({});
    };

    const validarDatos = () => {        
        const newErrors = {};
        if (!id) {
            newErrors.id = "El ID es requerido";
        }

        if (!historia) {
            newErrors.historia = "La historia es requerida";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleModalClose = () => {
        resetFormulario();
        handleClose();
    };

    const handleSave = () => {
        if (!validarDatos()){
            return;
        }
        const datos = { id, historia, prioridad, puntos, criterios};

        if (agregando) {
            agregarFila(datos);
        } else {
            cambiarFila(datos);
        }
        handleModalClose();
    };

    const handleDelete = () => {
        eliminarFila(id);
        handleModalClose();
    };

    return(
        <Modal show={show} onHide={handleModalClose} data-bs-theme="dark">
            <Modal.Header closeButton>
                <Modal.Title>{titulo()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { borrando ? (
                    <div>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="ID"
                                value={id}
                                type="text"
                                onChange={(e) => setId(e.target.value)}
                                isInvalid={!!errors.id}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.id}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </div>
                ) : (
                    <div>
                        {/* ID */}
                        <InputGroup className="mb-3" >
                            <Form.Control
                                placeholder="ID"
                                value={id}
                                type="text"
                                onChange={(e) => setId(e.target.value)}
                                isInvalid={!!errors.id}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.id}
                            </Form.Control.Feedback>
                        </InputGroup>

                        {/* Historia de Usuario */}
                        <InputGroup className="mb-3">
                            <Form.Control 
                                placeholder="Historia de Usuario"
                                value={historia}
                                type="text"
                                onChange={(e) => setHistoria(e.target.value)}
                                isInvalid={!!errors.historia}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.historia}
                            </Form.Control.Feedback>
                        </InputGroup>

                        {/* Prioridad */}
                        <InputGroup className="mb-3" >
                            <Form.Control
                                placeholder="Prioridad"
                                value={prioridad}
                                onChange={(e) => setPrioridad(e.target.value)}
                            />
                        </InputGroup>

                        {/* Puntos de prioridad */}
                        <InputGroup className="mb-3">
                            <Form.Control 
                                placeholder="Puntos de prioridad"
                                value={puntos}
                                type="number"
                                min={1}
                                onChange={(e) => setPuntos(e.target.value)}
                            />
                        </InputGroup>

                        {/* Criterios de Aceptación */}
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Criterios de Aceptación"
                                value={criterios}
                                onChange={(e) => setCriterios(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                )
                }
            </Modal.Body>
            <Modal.Footer>
                {borrando ? (
                        <div>
                            <Button variant="danger" onClick={handleDelete}> <i className="bi bi-trash"></i> Eliminar</Button>
                        </div>
                    ) : (
                        <div>
                            <Button variant="secondary" onClick={handleModalClose} className="me-3">Cancelar</Button>
                            <Button variant="primary" onClick={handleSave}> <i className="bi bi-floppy"></i> Guardar</Button>
                        </div>
                    )
                }
            </Modal.Footer>
        </Modal>
    )
}