import ModalHome from "../components/ModalHome";
import { Button, ListGroup, Alert, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from "react-router-dom";

export default function Home() {
    const [proyectos, setProyectos] = useState([
        {
            id: "1",
            users: ["Ana", "Luis", "Carlos"]
        },
        {
            id: "2",
            users: ["Marta", "Jorge"]
        }
    ]);
    const [borrando,setBorrando] = useState(false);
    const [agregando,setAgregando] = useState(false);
    const [show,setShow] = useState(false);
    const [proyectoSelect, setProyectoSelect] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    const mostrarMensaje = (texto, tipo) => {
        setMensaje({ texto, tipo });
        setTimeout(() => {
            setMensaje(null);
        }, 3000);
    };

    const eliminarFila = (idProyecto) => {
        const proyectoEliminado = proyectos.find(p => p.id === idProyecto);
        if (proyectoEliminado) {
            const nuevosProyectos = proyectos.filter( fila => fila.id !== idProyecto);
            setProyectos(nuevosProyectos);
            mostrarMensaje(`Proyecto #${idProyecto} eliminado correctamente`, "success");
        } else {
            mostrarMensaje(`No se encontró el proyecto con ID ${idProyecto}`, "danger");
        }
    };

    const agregarFila = (datos) => {
        if (proyectos.find(proyecto => proyecto.id === datos.id)){
            mostrarMensaje(`Ya existe un proyecto con el ID ${datos.id}`, "danger");
            return;
        }
        setProyectos([...proyectos,datos]);
        mostrarMensaje(`Proyecto #${datos.id} agregado correctamente`, "success");
    };

    const cambiarFila = (datos) => {
        const nuevosProyectos = proyectos.map( fila => 
                fila.id === datos.id ? datos : fila
        );
        setProyectos(nuevosProyectos);
        mostrarMensaje(`Proyecto #${datos.id} modificado correctamente`, "success");
    };

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setAgregando(false);
            setBorrando(false);
            setProyectoSelect(null);
        }, 200);
    };
    const handleShow = () => setShow(true);

    const abrirModalAgregar = () => {
        setProyectoSelect(null);
        setAgregando(true);
        setBorrando(false);
        handleShow();
    };

    const abrirModalModificar = (proyecto) => {
        setProyectoSelect(proyecto);
        setAgregando(false);
        setBorrando(false);
        handleShow();
    };

    const abrirModalEliminar = (proyecto) => {
        setProyectoSelect(proyecto);
        setAgregando(false);
        setBorrando(true);
        handleShow();
    };

    return (
        <>
            <h1 className="display-4 fw-bold text-center mb-3">Pro-Gestión 📌</h1>
            <p className="fs-4 fw-lighter text-center mb-4">Software de Gestión de Proyectos Ágiles</p>
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
                <i className="bi bi-plus-circle"></i> Añadir proyecto
                </Button>
            </div>
            <ListHome 
                proyectos={proyectos} 
                abrirModalModificar={abrirModalModificar}
                abrirModalEliminar={abrirModalEliminar}
            />
            <ModalHome 
                agregarFila={agregarFila} 
                cambiarFila={cambiarFila} 
                eliminarFila={eliminarFila} 
                show={show} 
                handleClose={handleClose} 
                agregando={agregando} 
                borrando={borrando} 
                data={proyectoSelect}
            />
        </>
    )
}

function ListHome({proyectos, abrirModalModificar, abrirModalEliminar}){
    return(
        <div className="container-fluid">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8} xl={6}>
                    {proyectos.map( (proyecto,index) => (
                        <div className = "card mb-4 column-custom-bg text-light" key={proyecto.id}>
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <h5 className="card-title text-white mb-0 fw-bold">
                                        <i className="bi bi-folder2 me-2"></i>
                                        Proyecto #{proyecto.id}
                                    </h5>
                                    <span className="badge bg-light text-dark">
                                        {proyecto.users.length} colaborador{proyecto.users.length !== 1 ? 'es' : ''}
                                    </span>
                                </div>
                                {proyecto.users.length!==0 && <div className="mb-3">
                                    <p className="text-white-50 mb-2 fw-semibold">
                                        <i className="bi bi-people me-2"></i>
                                        Colaboradores:
                                    </p>                                
                                    <ListGroup className="mb-3">
                                        {proyecto.users.map((usuario,indice) => (
                                            <ListGroup.Item key={indice} className="bg-dark text-light border-0">
                                                <i className="bi bi-person-fill me-2"></i>
                                                {usuario}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>}
                                <div className="d-flex flex-wrap gap-2 justify-content-start">
                                    <Link to="/backlog"><Button variant="secondary">
                                        <i className="bi bi-app-indicator"></i> Abrir
                                    </Button></Link>
                                    <Button 
                                        variant="dark"
                                        onClick={() => abrirModalModificar(proyecto)}
                                    >
                                        <i className="bi bi-pencil-square"></i> Editar
                                    </Button>
                                    <Button 
                                        variant="danger"
                                        onClick={() => abrirModalEliminar(proyecto)}
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