import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function ModalHome({agregarFila, cambiarFila, eliminarFila, show, handleClose, agregando, borrando, proyecto}){
    const [usuarios,setUsuarios] = useState([]);
    const [id,setId] = useState("");

    const titulo = () => {
        if (borrando) return "Borrar Proyecto";
        if (agregando) return "Agregar Proyecto";
        else return "Modificar Proyecto";
    }

    const handleGuardar = () => {
        const datos = {id: id, usuarios: usuarios}

        if(agregando){
            agregarFila(datos);
        } else {
            cambiarFila(datos);
        }
        resetDatos();
    }
    const resetDatos = () => {
        setId("");
        setUsuarios([]);
    };

    return(
        <div 
            className="modal show"
            style={{ display: 'block', position: "initial"}}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titulo()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { agregando ? (
                        <div>
                            <InputGroup>
                                <Form.Control 
                                    placeholder="ID"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <Form.Control 
                                    placeholder="Usuarios (separar por coma)"
                                    value={usuarios}
                                    onChange={(e) => setUsuarios(e.target.value.split(","))}
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
                                <InputGroup>
                                    <Form.Control 
                                        placeholder="ID"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Form.Control 
                                        placeholder="Usuarios (separar por coma)"
                                        value={usuarios}
                                        onChange={(e) => setUsuarios(e.target.value.split(","))}
                                    />
                                </InputGroup>
                            </div>
                        )
                    )}
                </Modal.Body>
                <Modal.Footer>
                    { agregando ? (
                        <div>
                            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                            <Button variant="primary" onClick={handleGuardar}> <i className="bi bi-floppy"></i>Guardar</Button>
                        </div>
                    ) : ( borrando ? (
                        <div>
                            <Button variant="danger" onClick={()=>{eliminarFila(id); handleClose; resetFormulario()}}> <i className="bi bi-trash"></i>Eliminar</Button>
                        </div>
                    ) : (
                        <div>
                            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                            <Button variant="primary" onClick={handleGuardar}> <i className="bi bi-floppy"></i> Guardar</Button>
                        </div>
                    ))}
                </Modal.Footer>
            </Modal>
        </div>
    )
}