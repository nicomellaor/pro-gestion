import DragAndDrop from "../components/DragAndDrop"

function Home() {
    const tasks = [{id: 1, content: 'Tarea 1', state: 'Por hacer'}, {id: 2, content: 'Tarea 2', state: 'En proceso'}, {id: 3, content: 'Tarea 3', state: 'Hecho'}, {id: 4, content: 'Tarea 4', state: 'Por hacer'}]
    return (
        <div className="main-container">
            <h1>ProGestión 📌</h1>
            <p className="text-center">Software de Gestión de Proyectos Ágiles</p>
            <DragAndDrop tasks={tasks}/>
        </div>
      )
}

export default Home