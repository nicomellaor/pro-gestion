import { useState } from "react"
import Column from "./Column"
import { Button } from 'react-bootstrap'

function Board ({tasks}) {
    const states = ['Backlog', 'Por hacer', 'En proceso', 'Hecho'];
    const [listTasks, setListTasks] = useState(tasks);

    const groupedTasks = listTasks.reduce((acc, task) => {
        acc[task.state] = [...(acc[task.state] || []), task];
        return acc;
    }, {});

    return (
        <div className="container-fluid px-3">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 px-3">
                {states.map( state => (
                    <Column 
                        state={state}
                        key={state}
                        tasks={groupedTasks[state] || []}
                    />
                ))}
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Button variant="primary"><i className="bi bi-plus"></i>Añadir Tarea</Button>
            </div>
        </div>
    )

}

export default Board