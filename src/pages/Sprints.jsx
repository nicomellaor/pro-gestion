import ModalSprint from "../components/ModalSprint";
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { useState } from 'react';

export default function Sprints() {
    const project = "Proyecto #1"
    const [proyectos, setProyectos] = useState([
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
            <h1 className="display-4 fw-bold text-center mb-3">Sprints 📅</h1>
            <p className="fs-4 fw-lighter text-center mb-4">{project}</p>
            <div className="text-center mb-4">
                <Button
                    variant="primary"
                    onClick={() => {
                        handleShow();
                        setAgregando(true);
                        setBorrando(false);
                    }}
                >
                <i className="bi bi-plus"></i> Añadir Sprint
                </Button>
            </div>
            <Lista 
                proyectos={proyectos} 
                setBorrando={setBorrando} 
                setAgregando={setAgregando} 
                handleShow={handleShow}
                setProyectoSelect={setProyectoSelect}
                eliminarFila={eliminarFila}
            />
            <ModalSprint
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

function Lista({proyectos, setBorrando, setAgregando, handleShow, setProyectoSelect, eliminarFila}){
    return(
        <div className="container">
            {proyectos.map( (proyecto,index) => (
                <div className = "card mb-3 bg-secondary text-light" key={proyecto.id}>
                    <div className="card-body">
                        <h5>{"Proyecto #"+(proyecto.id)}</h5>
                        <p><strong>Fechas:</strong></p>
                        <p>{"Fecha inicio: "+proyecto.inicio}</p>
                        <p>{"Fecha término: "+proyecto.fin}</p>
                        <ButtonGroup className = "gap-3">
                            <Button variant="secondary">
                                <i className="bi bi-app-indicator"></i> Abrir
                            </Button>
                            <Button 
                                variant="dark"
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
                        </ButtonGroup>
                    </div>
                </div>
            ))}
        </div>
    );
}