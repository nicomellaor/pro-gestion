import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function ModalHome({agregarFila, cambiarFila, eliminarFila, show, handleClose, agregando, borrando, data}){
    const [users, setUsers] = useState([]);
    const [id, setId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (show && data && !agregando && !borrando) {
            setId(data.id || null);
            setUsers(data.users || []);
        }
    }, [show, data, agregando, borrando]);

    useEffect(() => {
        if (show && (agregando || borrando)) {
            resetDatos();
        }
    }, [show, agregando, borrando]);

    const titulo = () => {
        if (borrando) return "Borrar proyecto";
        if (agregando) return "Agregar proyecto";
        else return "Modificar proyecto";
    }

    const resetDatos = () => {
        setId(null);
        setUsers([]);
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
        const datos = {id: id, users: users}

        if(agregando){
            agregarFila(datos);
        } else {
            cambiarFila(datos);
        }

        resetDatos();
        handleClose();
    };
    
    const handleDelete = () => {
        if (!validarDatos()) {
            return;
        }

        eliminarFila(id);
        resetDatos();
        handleClose();
    };

    const handleUsersChange = (value) => {
        const users = value.split(",").map(u => u.trim());
        setUsers(users);
    };

    const handleModalClose = () => {
        resetDatos();
        handleClose();
    }

    return(
        <Modal show={show} onHide={handleClose} data-bs-theme="dark">
            <Modal.Header closeButton>
                <Modal.Title>{titulo()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { agregando ? (
                    <div>
                        <InputGroup>
                            <Form.Control
                                className="mb-3" 
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
                        <InputGroup>
                            <Form.Control
                                className="mb-3" 
                                placeholder="Colaboradores (separar por coma)"
                                value={users.join(", ")}
                                onChange={(e) => handleUsersChange(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                ) : (
                    borrando ? (
                        <div>
                            <InputGroup>
                                <Form.Control 
                                    className="mb-3"
                                    placeholder="ID a eliminar"
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
                            <p>
                                <i className="bi bi-exclamation-triangle me-2"></i> 
                                ¿Está seguro que desea eliminar el proyecto con ID: <strong>{id}</strong>?
                            </p>
                        </div>
                    ) : (
                        <div>
                            <InputGroup>
                                <Form.Control
                                    className="mb-3" 
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
                            <InputGroup>
                                <Form.Control
                                    className="mb-3" 
                                    placeholder="Colaboradores (separar por coma)"
                                    value={users.join(", ")}
                                    onChange={(e) => handleUsersChange(e.target.value)}
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