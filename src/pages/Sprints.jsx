import ModalSprint from "../components/ModalSprint";
import { Button, ListGroup, Alert, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sprints() {
    const project = "Proyecto #1"
    const [sprints, setSprints] = useState([
        {
            id: "1",
            inicio: "2025-06-01",
            fin: "2025-06-04"
        },
        {
            id: "2",
            inicio: "2025-05-28",
            fin: "2025-06-12"
        }
    ]);
    const [borrando,setBorrando] = useState(false);
    const [agregando,setAgregando] = useState(false);
    const [show,setShow] = useState(false);
    const [sprintSelect, setSprintSelect] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    const mostrarMensaje = (texto, tipo) => {
        setMensaje({ texto, tipo });
        setTimeout(() => {
            setMensaje(null);
        }, 3000);
    };

    const eliminarFila = (idSprint) => {
        const sprintEliminado = sprints.find(p => p.id === idSprint);
        if (sprintEliminado) {
            const nuevosSprints = sprints.filter( fila => fila.id !== idSprint);
            setSprints(nuevosSprints);
            mostrarMensaje(`Sprint #${idSprint} eliminado correctamente`, "success");
        } else {
            mostrarMensaje(`No se encontró el sprint con ID ${idSprint}`, "danger");
        }
    };
    const agregarFila = (datos) => {
        if (sprints.find(sprint => sprint.id === datos.id)){
            mostrarMensaje(`Ya existe un sprint con el ID ${datos.id}`, "danger");
            return;
        }
        setSprints([...sprints,datos]);
        mostrarMensaje(`Sprint #${datos.id} agregado correctamente`, "success");
    };
    const cambiarFila = (datos) => {
        const nuevosSprints = sprints.map( fila => 
                fila.id === datos.id ? datos : fila
        );
        setSprints(nuevosSprints);
        mostrarMensaje(`Sprint #${datos.id} modificado correctamente`, "success");
    };

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setAgregando(false);
            setBorrando(false);
            setSprintSelect(null);
        }, 200);
    };
    const handleShow = () => setShow(true);

    const abrirModalAgregar = () => {
        setSprintSelect(null);
        setAgregando(true);
        setBorrando(false);
        handleShow();
    };

    const abrirModalModificar = (sprint) => {
        setSprintSelect(sprint);
        setAgregando(false);
        setBorrando(false);
        handleShow();
    };

    const abrirModalEliminar = (sprint) => {
        setSprintSelect(sprint);
        setAgregando(false);
        setBorrando(true);
        handleShow();
    };
    return (
        <>
            <h1 className="display-4 fw-bold text-center mb-3">Sprints 📅</h1>
            <p className="fs-4 fw-lighter text-center mb-4">{project}</p>
            {mensaje && (
                <Alert 
                    variant={mensaje.tipo} 
                    className="mx-auto mb-4" 
                    style={{maxWidth: '600px'}}
                    dismissible 
                    onClose={() => setMensaje(null)}
                >
                    {mensaje.texto}
                </Alert>
            )}
            <div className="text-center mb-4">
                <Button
                    variant="primary"
                    onClick={abrirModalAgregar}
                >
                <i className="bi bi-plus-circle"></i> Añadir Sprint
                </Button>
            </div>
            <ListSprint 
                sprints={sprints} 
                abrirModalModificar={abrirModalModificar}
                abrirModalEliminar={abrirModalEliminar}
            />
            <ModalSprint
                agregarFila={agregarFila} 
                cambiarFila={cambiarFila} 
                eliminarFila={eliminarFila} 
                show={show} 
                handleClose={handleClose} 
                agregando={agregando} 
                borrando={borrando} 
                data={sprintSelect}
            />
        </>
      )
}

function ListSprint({sprints, abrirModalModificar, abrirModalEliminar}){
    return(
        <div className="container-fluid">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8} xl={6}>
                    {sprints.map( (sprint,index) => (
                        <div className = "card mb-4 column-custom-bg text-light" key={sprint.id}>
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <h5 className="card-title text-white mb-0 fw-bold">
                                        <i className="bi bi-clock me-2"></i>
                                        Sprint #{sprint.id}
                                    </h5>
                                </div>
                                {(sprint.inicio.length!==0 || sprint.fin.length!==0) &&
                                    <div className="mb-3">
                                        <p className="text-white-50 mb-2 fw-semibold">
                                            <i className="bi bi-calendar-check me-2"></i>
                                            Fechas:
                                        </p>
                                        <p>Fecha inicio: <span className="badge bg-light text-dark ms-3">
                                            {sprint.inicio}
                                        </span></p> 
                                        <p>Fecha término: <span className="badge bg-light text-dark ms-3">
                                            {sprint.fin}
                                        </span></p>    
                                    </div>
                                }
                                <div className="d-flex flex-wrap gap-2 justify-content-start">
                                    <Link to="/kanban"><Button variant="secondary">
                                        <i className="bi bi-app-indicator"></i> Abrir
                                    </Button></Link>
                                    <Button 
                                        variant="dark"
                                        onClick={
                                            () => abrirModalModificar(sprint)
                                        }
                                    >
                                        <i className="bi bi-pencil-square"></i> Editar
                                    </Button>
                                    <Button 
                                        variant="danger"
                                        onClick={
                                            () => abrirModalEliminar(sprint)
                                        }
                                    >
                                        <i className="bi bi-trash"></i> Borrar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}                    
                </Col>
            </Row>
        </div>
    );
}