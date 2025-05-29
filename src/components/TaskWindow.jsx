import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function TaskWindow({ show, handleClose, onSubmit, onDelete, data }) {
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
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Efecto para inicializar el componente cuando se abre
  useEffect(() => {
    if (show) {
      if (data) {
        // Editando una tarea existente - modo visualización
        setTask(data);
        setIsEditing(false);
        setIsCreatingNew(false);
      } else {
        // Creando una nueva tarea - modo edición
        setTask(initialTask);
        setIsEditing(true);
        setIsCreatingNew(true);
      }
    }
  }, [show, data]);

  // Función para cerrar modal
  const handleModalClose = () => {
    // Si se está editando una tarea existente
    if (!isCreatingNew) {
      setIsEditing(false);
    }
    // Si si está creando una nueva tarea
    if (isCreatingNew) {
      setTask(initialTask);
    }
    handleClose();
  };

  // Función para enviar datos (crear o editar)
  const handleSubmit = () => {
    if (task.name.trim() !== "") { // Verifica si el nombre no es vacío
      onSubmit(task);
      handleModalClose();
    }
  };

  // Función para cancelar edición
  const handleCancelEdit = () => {
    // Restaurar modo visualización (si la tarea existe)
    if (data) {
      setTask(data);
      setIsEditing(false);
    } else {
      handleModalClose(); // Cerrar modal (si la tarea es nueva)
    }
  };

  const getModalTitle = () => {
    if (isCreatingNew) return "Nueva Tarea";
    if (isEditing) return "Editar Tarea";
    return task.name;
  };

  return (
    <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false} data-bs-theme="dark">
      <Modal.Header closeButton>
        <Modal.Title>{getModalTitle()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isEditing ? (
          <Form>
            <Form.Group className="mb-3" controlId="taskForm.Nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tarea 1"
                autoFocus
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskForm.Descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe una descripción..."
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskForm.Responsables">
              <Form.Label>Responsables</Form.Label>
              <Form.Control
                type="text"
                placeholder="Encargado 1, Encargado 2"
                value={task.managers}
                onChange={(e) => setTask({ ...task, managers: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskForm.FechaInicio">
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="datetime-local"
                value={task.startDate}
                onChange={(e) => setTask({ ...task, startDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskForm.FechaFin">
              <Form.Label>Fecha de fin</Form.Label>
              <Form.Control
                type="datetime-local"
                value={task.endDate}
                onChange={(e) => setTask({ ...task, endDate: e.target.value })}
              />
            </Form.Group>
          </Form>
        ) : (
          <>
            <div className="mb-3">
              <h5>Descripción</h5>
              <p>{task.description || 'Sin descripción'}</p>
            </div>
            <div className="mb-3">
              <h5>Responsables</h5>
              <p>{task.managers || 'Sin responsables asignados'}</p>
            </div>
            <div className="mb-3">
              <h5>Fecha de inicio</h5>
              <p>{task.startDate || 'No definida'}</p>
            </div>
            <div className="mb-3">
              <h5>Fecha de fin</h5>
              <p>{task.endDate || 'No definida'}</p>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isEditing ? (
          <>
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              <i className="bi bi-floppy"></i> Guardar
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              <i className="bi bi-pencil-square"></i> Editar
            </Button>
            <Button variant="danger" onClick={() => {onDelete(task.id)}}>
              <i className="bi bi-trash"></i> Borrar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}