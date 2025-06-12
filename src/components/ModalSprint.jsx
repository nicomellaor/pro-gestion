import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function ModalSprint({agregarFila, cambiarFila, eliminarFila, show, handleClose, agregando, borrando, sprint}){
    const [inicio,setInicio] = useState("");
    const [fin,setFin] = useState("");
    const [id,setId] = useState("");

    const titulo = () => {
        if (borrando) return "Borrar Sprint";
        if (agregando) return "Agregar Sprint";
        else return "Modificar Sprint";
    }

    const handleSave = () => {
        const datos = {id: id, inicio: inicio, fin: fin}

        if(agregando){
            agregarFila(datos);
        } else {
            cambiarFila(datos);
        }
        resetDatos();
    }
    const resetDatos = () => {
        setId("");
        setInicio("");
        setFin("");
    };

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
                            <InputGroup className="mb-3">
                                <Form.Control 
                                    placeholder="ID"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
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
                                <InputGroup>
                                    <Form.Control 
                                        placeholder="ID a eliminar"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                </InputGroup>
                            </div>
                        ) : (
                            <div>
                                <InputGroup className="mb-3">
                                    <Form.Control 
                                        placeholder="ID"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
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
                            <Button variant="secondary" onClick={handleClose} className="me-3">Cancelar</Button>
                            <Button variant="primary" onClick={handleSave}> <i className="bi bi-floppy"></i> Guardar</Button>
                        </div>
                    ) : ( borrando ? (
                        <div>
                            <Button variant="danger" onClick={()=>{eliminarFila(id); handleClose; resetFormulario()}}> <i className="bi bi-trash"></i> Eliminar</Button>
                        </div>
                    ) : (
                        <div>
                            <Button variant="secondary" onClick={handleClose} className="me-3">Cancelar</Button>
                            <Button variant="primary" onClick={handleSave}> <i className="bi bi-floppy"></i> Guardar</Button>
                        </div>
                    ))}
                </Modal.Footer>
            </Modal>
        </div>
    )
}