import Board from "../components/Board"

function Kanban() {
    const tasks = [
        {id: 1, name: 'Tarea 1', state: 'Por hacer', description: 'Lorem ipsum dolor sit amet.', managers: 'Encargado 1, Encargado 2', startDate: '', endDate: ''}, 
        {id: 2, name: 'Tarea 2', state: 'Por hacer', description: 'Lorem ipsum dolor sit amet.', managers: 'Encargado 1, Encargado 2', startDate: '', endDate: ''}, 
        {id: 3, name: 'Tarea 3', state: 'En proceso', description: 'Lorem ipsum dolor sit amet.', managers: 'Encargado 1, Encargado 2', startDate: '', endDate: ''}, 
        {id: 4, name: 'Tarea 4', state: 'Hecho', description: 'Lorem ipsum dolor sit amet.', managers: 'Encargado 1, Encargado 2', startDate: '', endDate: ''}
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