import { Button } from 'react-bootstrap'
import TaskWindow from './TaskWindow';
import { useState } from 'react';

function Task({ data, onEdit, onDelete }) {
  // Manejar ventana emergente de Tarea
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (task) => {
    onEdit(data.id, task)
  }

  return (
    <>
    <div className="task-custom-bg task-custom-py task-custom-lh task-custom-min-height d-flex justify-content-between align-items-center my-2 px-3 rounded-2 gap-3 text-break w-100">
      <p className='mb-0 task-p-styling'>{data.name}</p>
      <Button variant="link" size="sm" className="p-0 text-secondary" onClick={handleShow}>
        <i className="bi bi-box-arrow-up-right"></i>
      </Button>
    </div>
    <TaskWindow show={show} handleClose={handleClose} onSubmit={handleChange} onDelete={onDelete} data={data}></TaskWindow>    
    </>
  );
}

export default Task