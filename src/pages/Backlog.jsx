import Tabla from "../components/Tabla";
import ModalTabla from "../components/ModalTabla";
import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';

function Backlog() {
    const project = "Proyecto #1"

    //Filas
    const [filas, setFilas] = useState([
        {
            id: "US-001",
            historia: "Como usuario, quiero poder iniciar sesión para acceder a mis datos.",
            prioridad: "alta",
            puntos: 5,
            criterios: "Debe permitir ingresar email y contraseña válidos.",
        },
        {
            id: "US-002",
            historia: "Como administrador, quiero ver un listado de usuarios registrados.",
            prioridad: "media",
            puntos: 3,
            criterios: "Mostrar nombre, email y fecha de registro.",
        },
        {
            id: "US-003",
            historia: "Como usuario, quiero poder cerrar sesión desde cualquier página.",
            prioridad: "baja",
            puntos: 2,
            criterios: "Debe haber un botón visible de 'Cerrar sesión' en la barra superior.",
        },
    ]);
    const [show, setShow] = useState(false);
    const [borrando, setBorrando] = useState(false);
    const [agregando, setAgregando] = useState(false);

    //Mostrar y Cerrar el Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Funcion para agregar filas
    const agregarFila = (datos) => {
        setFilas([...filas,datos]);
    };

    //Cambiar elementos de una fila
    const cambiarFila = (datos) => {
        const nuevasFilas = filas.map( fila => 
                fila.id === datos.id ? datos : fila
        );
        setFilas(nuevasFilas);
    };

    //Quitar fila
    const eliminarFila = (datos) => {
        const nuevasFilas = filas.filter( fila => fila.id !== datos);
        setFilas(nuevasFilas);
    };

    return (
        <>
            <h1 className="display-4 fw-bold text-center mb-3">Product Backlog 📋</h1>
            <p className="fs-4 fw-lighter text-center mb-4">{project}</p>
            <div className="d-flex justify-content-center">
                <ButtonGroup className = "gap-3 mb-4">
                    <Button variant="secondary" style={{ borderRadius: "8px" }}>
                        <i className="bi bi-box-arrow-in-right"></i> Ver Sprints
                    </Button>
                    <Button 
                        variant="dark" 
                        style={{ borderRadius: "8px" }} 
                        onClick={
                            ()=>{
                                handleShow()
                                setAgregando(true)
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
                        <i className="bi bi-plus"></i> Historia
                    </Button>
                </ButtonGroup>
            </div>
            <Tabla filas={filas}/>
            <ModalTabla agregarFila={agregarFila} cambiarFila={cambiarFila} borrando={borrando} agregando={agregando} show={show} handleClose={handleClose} eliminarFila={eliminarFila}/>
        </>
      )
}

export default Backlog