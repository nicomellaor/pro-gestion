import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function TaskWindow({ show, handleClose, onSubmit }) {
  const initialTask = {
        id: '',
        name: '',
        state: '',
        description: '',
        managers: '',
        startDate: '',
        endDate: ''
    };
  const [task, setTask] = useState(initialTask);

  const handleSubmit = () => {
    if (task.name.trim() !== "") {
      onSubmit(task);
      handleClose();
      setTask(initialTask);
    }
  };

  return (
      <Modal show={show} onHide={handleClose} data-bs-theme="dark">
        <Modal.Header closeButton>
          <Modal.Title>Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="taskForm.Nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tarea 1"
                autoFocus
                value={task.name} 
                onChange={(e) => setTask({...task, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskForm.Descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Escribe una descripción..."
                value={task.description} 
                onChange={(e) => setTask({...task, description: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskForm.Responsables">
              <Form.Label>Responsables</Form.Label>
              <Form.Control
                type="text"
                placeholder="Encargado 1, Encargado 2"
                value={task.managers} 
                onChange={(e) => setTask({...task, managers: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskForm.FechaInicio">
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="datetime-local"
                value={task.startDate} 
                onChange={(e) => setTask({...task, startDate: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskForm.FechaFin">
              <Form.Label>Fecha de fin</Form.Label>
              <Form.Control
                type="datetime-local"
                value={task.endDate} 
                onChange={(e) => setTask({...task, endDate: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            <i className="bi bi-floppy"></i> Guardar
          </Button>
        </Modal.Footer>
      </Modal>
  );
}