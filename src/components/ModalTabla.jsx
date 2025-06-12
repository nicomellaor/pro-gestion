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
    const [criterio,setCriterio] = useState("");


    const titulo = () => {
        if (borrando) return "Borrar Historia";
        if (agregando) return "Agregar Historia";
        else return "Modificar Historia";
    }

    const handleSave = () => {
        const datos = { id, historia, prioridad, puntos, criterios: criterio};

        if (agregando) {
            agregarFila(datos);
        } else {
            cambiarFila(datos);
        }
        handleClose();
    }

    const resetFormulario = () => {
        setId("");
        setHistoria("");
        setPrioridad("");
        setPuntos("");
        setCriterio("");
    }

    return(
        <div
            className="modal show"
            style={{ display: 'block', position: "initial"}}
        >
            <Modal show={show} onHide={handleClose} data-bs-theme="dark">
                <Modal.Header closeButton>
                    <Modal.Title>{titulo()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { agregando ? (
                        <div>
                            {/* ID */}
                            <InputGroup>
                                <Form.Control
                                    className="mb-3" 
                                    placeholder="ID"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </InputGroup>

                            {/* Historia de Usuario */}
                            <InputGroup>
                                <Form.Control
                                    className="mb-3" 
                                    placeholder="Historia de Usuario"
                                    value={historia}
                                    onChange={(e) => setHistoria(e.target.value)}
                                />
                            </InputGroup>

                            {/* Prioridad */}
                            <InputGroup>
                                <Form.Control
                                    className="mb-3" 
                                    placeholder="Prioridad"
                                    value={prioridad}
                                    onChange={(e) => setPrioridad(e.target.value)}
                                />
                            </InputGroup>

                            {/* Puntos de prioridad */}
                            <InputGroup>
                                <Form.Control
                                    className="mb-3" 
                                    placeholder="Puntos de prioridad"
                                    value={puntos}
                                    onChange={(e) => setPuntos(e.target.value)}
                                />
                            </InputGroup>

                            {/* Criterios de Aceptación */}
                            <InputGroup>
                                <Form.Control
                                    className="mb-3" 
                                    placeholder="Criterios de Aceptación"
                                    value={criterio}
                                    onChange={(e) => setCriterio(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    ) : (
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="id-prefijo">US-</InputGroup.Text>
                                <Form.Control
                                    placeholder="ID"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    )
                    }
                </Modal.Body>
                <Modal.Footer>
                    {borrando ? (
                            <div>
                                <Button variant="danger" onClick={()=>{eliminarFila("US-"+id); handleClose; resetFormulario()}}> <i className="bi bi-trash"></i> Eliminar</Button>
                            </div>
                        ) : (
                            <div>
                                <Button variant="secondary" onClick={handleClose} className="me-3">Cancelar</Button>
                                <Button variant="primary" onClick={handleSave}> <i className="bi bi-floppy"></i> Guardar</Button>
                            </div>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}