import DragAndDrop from "../components/DragAndDrop"

function Kanban() {
    const tasks = [{id: 1, content: 'Tarea 1', state: 'Por hacer'}, {id: 2, content: 'Tarea 2', state: 'En proceso'}, {id: 3, content: 'Tarea 3', state: 'Backlog'}, {id: 4, content: 'Tarea 4', state: 'Por hacer'}]
    return (
        <>
            <h1>Proyecto #1</h1>
            <p className="text-center">Sprint #1</p>
            <DragAndDrop tasks={tasks}/>
        </>
      )
}

export default Kanban