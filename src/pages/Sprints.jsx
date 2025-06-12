import ModalSprint from "../components/ModalSprint";
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
        if (!proyectos.find(sprint => sprint.id === datos.id)){
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
                <i className="bi bi-plus-circle"></i> Añadir Sprint
                </Button>
            </div>
            <ListSprint 
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
                sprint={proyectoSelect}
            />
        </>
      )
}

function ListSprint({proyectos, setBorrando, setAgregando, handleShow, setProyectoSelect, eliminarFila}){
    return(
        <div className="container">
            {proyectos.map( (sprint,index) => (
                <div className = "card mb-3 column-custom-bg text-light" key={sprint.id}>
                    <div className="card-body">
                        <h5>{"Sprint #"+(sprint.id)}</h5>
                        <p><strong>Fechas:</strong></p>
                        <p>{"Fecha inicio: "+sprint.inicio}</p>
                        <p>{"Fecha término: "+sprint.fin}</p>
                        <Link to="/kanban"><Button variant="secondary" className="me-3">
                            <i className="bi bi-app-indicator"></i> Abrir
                        </Button></Link>
                        <Button 
                            variant="dark"
                            className="me-3"
                            onClick={
                                () => {
                                    setProyectoSelect(sprint);
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
                                    eliminarFila(sprint.id);
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