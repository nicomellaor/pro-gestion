import { useState, useEffect } from "react"
import { Button } from 'react-bootstrap'
import { DragDropContext } from '@hello-pangea/dnd'
import Column from "./Column"
import TaskWindow from "./TaskWindow"

export default function Board() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Manejar ventana emergente de Tarea
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Estructura de columnas
  const columns = {
    'Backlog': { id: 'Backlog', title: 'Backlog' },
    'Por hacer': { id: 'Por hacer', title: 'Por hacer' },
    'En proceso': { id: 'En proceso', title: 'En proceso' },
    'Hecho': { id: 'Hecho', title: 'Hecho' }
  };

  // Agrupar tareas por estado
  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.state] = [...(acc[task.state] || []), task];
    return acc;
  }, {});

  // Manejar el final del drag and drop
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    // Si no hay destino válido
    if (!destination) return;
    
    // Si no cambió de posición
    if (destination.droppableId === source.droppableId && 
        destination.index === source.index) return;
    
    const taskId = parseInt(draggableId);
    const newState = destination.droppableId;
    
    setTasks(currentTasks => {
      const newTasks = [...currentTasks];
      
      // Encontrar la tarea
      const taskIndex = newTasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) return currentTasks;
      
      // Actualizar el estado de la tarea
      newTasks[taskIndex] = { ...newTasks[taskIndex], state: newState };
      
      // Si cambió de columna se pone al final
      // Si es la misma columna maneja el reordenamiento automáticamente
      if (source.droppableId === destination.droppableId) {
        // Reordenar dentro de la misma columna
        const columnTasks = newTasks.filter(task => task.state === newState);
        const [movedTask] = columnTasks.splice(source.index, 1);
        columnTasks.splice(destination.index, 0, movedTask);
        
        // Actualizar todas las tareas de esa columna con nuevo orden
        const otherTasks = newTasks.filter(task => task.state !== newState);
        return [...otherTasks, ...columnTasks];
      }
      
      return newTasks;
    });
  };

  // Función para añadir una nueva tarea
  const handleAddTask = (task) => {
    setTasks(currentTasks => {
      const newId = currentTasks.length > 0 
        ? Math.max(...currentTasks.map(t => t.id)) + 1 
        : 1;
      
      const newTask = { ...task, id: newId, state: 'Backlog' };
      return [...currentTasks, newTask];
    });
  };

  // Función para editar una tarea
  const handleEditTask = (id, newTask) => {
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === id ? { ...task, ...newTask } : task
      )
    );
  };

  // Función para eliminar una tarea
  const handleDeleteTask = (id) => {
    setTasks(currentTasks => 
      currentTasks.filter(task => task.id !== id)
    );
  };

  // Actualizar localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container-fluid px-3">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 px-3">
          {Object.values(columns).map(column => (
            <Column
              key={column.id}
              id={column.id}
              state={column.title}
              tasks={groupedTasks[column.id] || []}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
        
        <div className="d-flex justify-content-center mt-5">
          <Button variant="primary" onClick={handleShow}>
            <i className="bi bi-plus"></i> Añadir Tarea
          </Button>
        </div>
      </div>
      
      <TaskWindow 
        show={show} 
        handleClose={handleClose} 
        onSubmit={handleAddTask}
      />
    </DragDropContext>
  );
}