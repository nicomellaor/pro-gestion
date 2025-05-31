# Pro-Gestión - Software de Gestión de Proyectos Ágiles
Gracias a esta herramienta podrás gestionar tus proyectos utilizando metodologías como SCRUM y Kanban en un solo lugar. 

## Secciones
- **Home**: Página principal de selección de proyectos.
- **Backlog**: Tabla del Product Backlog donde podrás organizar tus historias de usuario.
- **Sprints**: Página de selección de Sprints.
- **Kanban**: Tablero de tareas con distintos estados (Backlog - Por hacer - En Proceso - Hecho).

## Drag and Drop
Se utiliza **@hello-pangea/dnd** para construir la funcionalidad de Drag and Drop.

### Componentes Principales
- `DragDropContext`: Define zona donde los elementos pueden ser reordenados.
- `Droppable`: Define zona donde soltar.
- `Draggable`: Elemento arrastable.
- `HandleDragEnd`: Función única para manejar el cambio de una tarea.
    - `source`: Desde dónde viene la tarea.
    - `destination`: Hacia dónde va la tarea.
    - `draggableId`: Id de la tarea que se movió.