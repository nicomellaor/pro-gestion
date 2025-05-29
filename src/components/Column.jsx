import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core";
import SortableTask from "./SortableTask"

function Column({ id, tasks, state, onEdit, onDelete }) {
  // Permitir que la columna sea una zona donde soltar
  const { setNodeRef } = useDroppable({
    id: id
  });

  return (
    <div className="col">
      <div 
        ref={setNodeRef}
        className="d-flex flex-column align-items-center column-custom-bg p-3 rounded-4 w-100 mx-auto text-light shadow-sm"
        style={{ minHeight: '200px' }} // Asegurar altura mínima para columnas vacías
      >
        <p className="fs-4">{state}</p>
        <SortableContext 
          items={tasks.map(task => `task-${task.id}`)} 
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <SortableTask
              key={task.id}
              id={`task-${task.id}`}
              data={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default Column