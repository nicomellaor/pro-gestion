import { Droppable } from "@hello-pangea/dnd"
import Task from "./Task"

export default function Column({ id, tasks, state, onEdit, onDelete }) {
  return (
    <div className="col">
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`d-flex flex-column align-items-center column-custom-bg p-3 rounded-4 w-100 mx-auto text-light shadow-sm ${
              snapshot.isDraggingOver ? 'column-hover' : ''
            }`}
            style={{ minHeight: '200px' }}
          >
            <p className="fs-4">{state}</p>
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                id={task.id.toString()}
                index={index}
                data={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}