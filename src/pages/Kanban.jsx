import Board from "../components/Board"

function Kanban() {
    const tasks = [
        {id: 1, content: 'Tarea 1', state: 'Por hacer'}, 
        {id: 2, content: 'Tarea 2', state: 'En proceso'}, 
        {id: 3, content: 'Tarea 3', state: 'Backlog'}, 
        {id: 4, content: 'Tarea 4', state: 'Por hacer'}
    ]
    const sprint = "Sprint #1"

    return (
        <>
            <h1 className="display-4 fw-bold text-center mb-3">Kanban ✅</h1>
            <p className="fs-4 fw-lighter text-center mb-4">{sprint}</p>
            <Board initialTasks={tasks}/>
        </>
      )
}

export default Kanban