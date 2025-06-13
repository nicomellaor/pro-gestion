import Tabla from "../components/Tabla";
import ModalTabla from "../components/ModalTabla";
import { Button, ButtonGroup, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Backlog() {
    const project = "Proyecto #1"

    //Filas
    const [filas, setFilas] = useState([
        {
            id: "US-001",
            historia: "Como usuario, quiero poder iniciar sesión para acceder a mis datos.",
            prioridad: "Alta",
            puntos: 5,
            criterios: "Debe permitir ingresar email y contraseña válidos.",
        },
        {
            id: "US-002",
            historia: "Como administrador, quiero ver un listado de usuarios registrados.",
            prioridad: "Media",
            puntos: 3,
            criterios: "Mostrar nombre, email y fecha de registro.",
        },
        {
            id: "US-003",
            historia: "Como usuario, quiero poder cerrar sesión desde cualquier página.",
            prioridad: "Baja",
            puntos: 2,
            criterios: "Debe haber un botón visible de 'Cerrar sesión' en la barra superior.",
        },
    ]);
    const [show, setShow] = useState(false);
    const [borrando, setBorrando] = useState(false);
    const [agregando, setAgregando] = useState(false);
    const [mensaje, setMensaje] = useState(null);

    const mostrarMensaje = (texto, tipo) => {
        setMensaje({ texto, tipo });
        setTimeout(() => {
            setMensaje(null);
        }, 3000);
    };

    //Mostrar y Cerrar el Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Funcion para agregar filas
    const agregarFila = (datos) => {
        if (filas.find(fila => fila.id === datos.id)) {
            mostrarMensaje(`Ya existe una historia con ID ${datos.id}`, "danger");
            return;
        }
        setFilas([...filas,datos]);
        mostrarMensaje(`Historia ${datos.id} agregada correctamente`, "success");
    };

    //Cambiar elementos de una fila
    const cambiarFila = (datos) => {
        const nuevasFilas = filas.map( fila => 
                fila.id === datos.id ? datos : fila
        );
        setFilas(nuevasFilas);
        mostrarMensaje(`Historia ${datos.id} modificada correctamente`, "success");
    };

    //Quitar fila
    const eliminarFila = (idStory) => {
        const storyEliminada = filas.find(f => f.id === idStory);
        if (storyEliminada) {
            const nuevasFilas = filas.filter( fila => fila.id !== idStory);
            setFilas(nuevasFilas);
            mostrarMensaje(`Historia ${idStory} eliminada correctamente`, "success");
        } else {
            mostrarMensaje(`No se encontró la historia con ID ${idStory}`, "danger");
        }
        
    };

    return (
        <>
            <h1 className="display-4 fw-bold text-center mb-3">Product Backlog 📋</h1>
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
            <div className="d-flex justify-content-center">
                <ButtonGroup className = "gap-3 mb-4">
                    <Link to="/sprints"><Button variant="secondary" style={{ borderRadius: "8px" }}>
                        <i className="bi bi-box-arrow-in-right"></i> Ver Sprints
                    </Button></Link>
                    <Button 
                        variant="dark" 
                        style={{ borderRadius: "8px" }} 
                        onClick={
                            ()=>{
                                handleShow()
                                setAgregando(false)
                                setBorrando(false)
                            }
                        }>
                        <i className="bi bi-pencil-square"></i> Editar
                    </Button>
                    <Button 
                        variant="danger" 
                        style={{ borderRadius: "8px" }} 
                        onClick={
                            ()=>{
                                handleShow()
                                setAgregando(false)
                                setBorrando(true)
                            }
                        }>
                        <i className="bi bi-trash"></i> Borrar
                    </Button>
                    <Button 
                        variant="primary" 
                        style={{ borderRadius: "8px" }} 
                        onClick={
                            ()=>{
                                handleShow()
                                setAgregando(true)
                                setBorrando(false)
                            }
                        }>
                        <i className="bi bi-plus-circle"></i> Historia
                    </Button>
                </ButtonGroup>
            </div>
            <div 
            className="p-4"
            style={{
                marginLeft: "60px",
                marginRight: "60px"
            }}>
                <Tabla filas={filas}/>
            </div>        
            <ModalTabla agregarFila={agregarFila} cambiarFila={cambiarFila} borrando={borrando} agregando={agregando} show={show} handleClose={handleClose} eliminarFila={eliminarFila}/>
        </>
      )
}

export default Backlog