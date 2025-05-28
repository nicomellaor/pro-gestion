import { useState } from "react"
import Column from "./Column"
import { Button } from 'react-bootstrap'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import TaskWindow from "./TaskWindow";

function Board({ initialTasks }) {
  const states = ['Backlog', 'Por hacer', 'En proceso', 'Hecho'];
  const [tasks, setTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState(null);

  // Manejar ventana emergente de Tarea
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Encontrar la tarea activa para mostrarla en el overlay
  const activeTask = activeId ? tasks.find(task => `task-${task.id}` === activeId) : null;
  
  // Agrupar tareas por estado
  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.state] = [...(acc[task.state] || []), task];
    return acc;
  }, {});

  // Configuración de sensores para dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Ajusta la distancia mínima para activar el arrastre
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Control del inicio del arrastre
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Manejar el final del drag and drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over) return;
    
    const activeTaskId = active.id.replace('task-', '');
    const taskId = parseInt(activeTaskId);
    
    // Si estamos soltando sobre una columna
    if (over.id.toString().startsWith('column-')) {
      const newState = over.id.replace('column-', '');
      
      // Actualizar el estado de la tarea
      setTasks(items => // items: Estado actual de tasks
        items.map(task => 
          task.id === taskId ? { ...task, state: newState } : task
        )
      );
      return;
    }
    
    // Si estamos soltando sobre otra tarea (reordenamiento dentro de la misma columna)
    if (active.id !== over.id) {
      const overTaskId = over.id.replace('task-', '');
      const activeTask = tasks.find(task => task.id === taskId);
      const overTask = tasks.find(task => task.id === parseInt(overTaskId));
      
      // Si las tareas están en la misma columna
      if (activeTask && overTask && activeTask.state === overTask.state) {
        setTasks(items => {
          const oldIndex = groupedTasks[activeTask.state].findIndex(t => t.id === taskId);
          const newIndex = groupedTasks[activeTask.state].findIndex(t => t.id === parseInt(overTaskId));
          
          const tasksInColumn = [...groupedTasks[activeTask.state]];
          const reorderedTasks = arrayMove(tasksInColumn, oldIndex, newIndex);
          
          // Crear un nuevo array de tareas con el orden actualizado
          return items.map(task => { // Retorna un nuevo items para setear tasks
            if (task.state === activeTask.state) {
              const index = tasksInColumn.findIndex(t => t.id === task.id);
              return reorderedTasks[index];
            }
            return task;
          });
        });
      } else if (activeTask && overTask && activeTask.state !== overTask.state) {
        // Si las tareas están en columnas diferentes se cambia el estado
        setTasks(items =>
          items.map(task =>
            task.id === taskId ? { ...task, state: overTask.state } : task
          )
        );
      }
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeTaskId = active.id.replace('task-', '');
    const taskId = parseInt(activeTaskId);
    const activeTask = tasks.find(task => task.id === taskId);
    
    // Si el destino es una columna
    if (over.id.toString().startsWith('column-')) {
      const newState = over.id.replace('column-', '');
      
      // Se actualiza si el estado es diferente
      if (activeTask && activeTask.state !== newState) {
        setTasks(items => 
          items.map(task => 
            task.id === taskId ? { ...task, state: newState } : task
          )
        );
      }
    }
  };

  // Función para añadir una nueva tarea
  const handleAddTask = (task) => {
    const newId = Math.max(...tasks.map(task => task.id)) + 1;
    const newTask = {...task, id: newId, state: 'Backlog'};
    setTasks([...tasks, newTask]);
    console.log(newTask)
  };

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="container-fluid px-3">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 px-3">
          {states.map(state => (
            <Column
              key={state}
              id={`column-${state}`}
              state={state}
              tasks={groupedTasks[state] || []}
            />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Button variant="primary" onClick={handleShow}>
            <i className="bi bi-plus"></i> Añadir Tarea
          </Button>
        </div>
      </div>
      <TaskWindow show={show} handleClose={handleClose} onSubmit={handleAddTask}></TaskWindow>
      <DragOverlay>
        {activeId && activeTask ? (
          <div className="task-custom-bg task-custom-py task-custom-lh task-custom-min-height d-flex justify-content-between align-items-center my-2 px-3 rounded-2 gap-3 text-break w-100 task-dragoverlay">
            <p className='mb-0 task-p-styling'>{activeTask.name}</p>
            <Button variant="link" size="sm" className="p-0 text-secondary">
              <i className="bi bi-box-arrow-up-right"></i>
            </Button>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Board