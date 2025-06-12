import { Button } from 'react-bootstrap'
import { Draggable } from '@hello-pangea/dnd'
import ModalTask from './ModalTask'
import { useState } from 'react'

export default function Task({ id, index, data, onEdit, onDelete }) {
  // Manejar ventana emergente de Tarea
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleChange = (task) => {
    onEdit(data.id, task)
  }

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`task-custom-bg task-custom-py task-custom-lh task-custom-min-height d-flex justify-content-between align-items-center my-2 px-3 rounded-2 gap-3 text-break w-100 ${
              snapshot.isDragging ? 'task-dragging' : ''}`}
          >
            <p className='mb-0 task-p-styling'>{data.name}</p>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 text-secondary btn-icon-hover" 
              onClick={handleShow}
              // Evitar que el click del botón active el drag
              onMouseDown={(e) => e.stopPropagation()}
            >
              <i className="bi bi-box-arrow-up-right"></i>
            </Button>
          </div>
        )}
      </Draggable>
      
      <ModalTask 
        show={show} 
        handleClose={handleClose} 
        onSubmit={handleChange} 
        onDelete={onDelete} 
        data={data}
      />    
    </>
  );
}