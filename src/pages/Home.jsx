import ModalHome from "../components/ModalHome";
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from "react-router-dom";

export default function Home() {
    const [proyectos, setProyectos] = useState([
        {
            id: "1",
            usuarios: ["Ana", "Luis", "Carlos"]
        },
        {
            id: "2",
            usuarios: ["Marta", "Jorge"]
        }
    ]);
    const [borrando,setBorrando] = useState(false);
    const [agregando,setAgregando] = useState(false);
    const [show,setShow] = useState(false);
    const [proyectoSelect, setProyectoSelect] = useState(null);

    const eliminarFila = (datos) => {
        const nuevosProyectos = proyectos.filter( fila => fila.id !== datos);
        setProyectos(nuevosProyectos);
    };
    const agregarFila = (datos) => {
        if (!proyectos.find(proyecto => proyecto.id === datos.id)){
            setProyectos([...proyectos,datos]);
        }
    };
    const cambiarFila = (datos) => {
        const nuevosProyectos = proyectos.map( fila => 
                fila.id === datos.id ? datos : fila
        );
        setProyectos(nuevosProyectos);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <h1 className="display-4 fw-bold text-center mb-3">Pro-Gestión 📌</h1>
            <p className="fs-4 fw-lighter text-center mb-4">Software de Gestión de Proyectos Ágiles</p>
            <div className="text-center mb-4">
                <Button
                    variant="primary"
                    onClick={() => {
                        handleShow();
                        setAgregando(true);
                        setBorrando(false);
                    }}
                >
                <i className="bi bi-plus-circle"></i> Añadir proyecto
                </Button>
            </div>
            <List 
                proyectos={proyectos} 
                setBorrando={setBorrando} 
                setAgregando={setAgregando} 
                handleShow={handleShow}
                setProyectoSelect={setProyectoSelect}
                eliminarFila={eliminarFila}
            />
            <ModalHome 
                agregarFila={agregarFila} 
                cambiarFila={cambiarFila} 
                eliminarFila={eliminarFila} 
                show={show} 
                handleClose={handleClose} 
                agregando={agregando} 
                borrando={borrando} 
                proyecto={proyectoSelect}
            />
        </>
    )
}

function List({proyectos, setBorrando, setAgregando, handleShow, setProyectoSelect, eliminarFila}){
    return(
        <div className="container">
            {proyectos.map( (proyecto,index) => (
                <div className = "card mb-3 column-custom-bg text-light" key={proyecto.id}>
                    <div className="card-body">
                        <h5>{"Proyecto #"+(proyecto.id)}</h5>
                        <p><strong>Integrantes:</strong></p>
                        <ListGroup className="mb-3">
                            {proyecto.usuarios.map((usuario,indice) => (
                                <ListGroup.Item key={indice} className="bg-dark text-light border-0">{usuario}</ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Link to="/backlog"><Button variant="secondary" className="me-3">
                            <i className="bi bi-app-indicator"></i> Abrir
                        </Button></Link>
                        <Button 
                            variant="dark"
                            className="me-3"
                            onClick={
                                () => {
                                    setProyectoSelect(proyecto);
                                    handleShow();
                                    setBorrando(false);
                                    setAgregando(false);
                                }
                            }
                        >
                            <i className="bi bi-pencil-square"></i> Editar
                        </Button>
                        <Button 
                            variant="danger"
                            className="me-3"
                            onClick={
                                () => {
                                    eliminarFila(proyecto.id);
                                    setBorrando(true);
                                    setAgregando(false);
                                }
                            }
                        >
                            <i className="bi bi-trash"></i> Borrar
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}