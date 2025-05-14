import { useState } from "react"
import ContainerCard from "./ContainerCard"

function DragAndDrop ({tasks}) {
    const states = ['Backlog', 'Por hacer', 'En proceso', 'Hecho']
    const [isDragging, setIsDragging] = useState(false)
    const [listTasks, setListTasks] = useState(tasks)

    const handleDragging = (dragging) => setIsDragging(dragging)

    const handleUpdateList = (id, state) => {
        let task = listTasks.find(item => item.id === id)
        if (task && task.state !== state) {
            task.state = state
            setListTasks(prev => ([
                task,
                ...prev.filter(item => item.id !== id)
            ]))
        }
    }

    return (
        <div className="cards-grid">
            {
                states.map( state => (
                    <ContainerCard 
                        state={state}
                        key={state}
                        tasks={listTasks}
                        isDragging={isDragging}
                        handleDragging={handleDragging}
                        handleUpdateList={handleUpdateList}
                    />
                ))
            }
        </div>
    )

}

export default DragAndDrop