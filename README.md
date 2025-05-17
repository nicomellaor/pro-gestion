# Pro-Gestión

## Drag and Drop
Se utiliza **dnd-kit** para construir la funcionalidad de Drag and Drop.

### Componentes Principales del Drag and Drop
* `DndContext`: Coordinador central de las operaciones, necesario para los hooks.
* `DragOverlay`: Muestra una copia visual mientras se arrastra (sigue el cursor).
* `SortableContext`: Define zona donde los elementos pueden ser reordenados.
* `useDroppable`: Hook para que las columnas sean zonas donde soltar.
* `useSortable`: Hook para que las tareas sean arrastables y ordenables.

### Objetos
* `active`: elemento que está siendo arrastrado.
* `over`: elemento sobre el cuál está flotando el elemento arrastrado.

### Funciones Clave
* `handleDragStart`: 
    * Se ejecuta cuando comienza a arrastrarse una tarea.
    * Guarda el id del elemento que se está arrastrando.
    * Setea *activeId* para mostrar el overlay.
* `handleDragOver`: 
    * Se ejecuta mientras el elemento se arrastra sobre posibles destinos.
    * Detecta si está en una columna diferente (column-*state*).
    * Actualiza el estado para mostrar una preview visualmente.
* `handleDragEnd`:
    * Se ejecuta cuando se termina de arrastrar y se suelta.
    * Limpia *activeId* para dejar el overlay.
    * Si se suelta sobre una Column cambia el estado.
    * Si se suelta sobre otra Task reordena las tareas (su task-*id*) o cambia su estado.
