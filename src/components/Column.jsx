import Task from "./Task"

function Column({ tasks, state }) {
    return(
        <div>
            <div className="d-flex flex-column align-items-center column-custom-bg p-3 rounded-4 w-100 mx-auto text-light shadow-sm">
                <p className="fs-4">{state}</p>
                {tasks.map(task => (
                        <Task
                            data={task}
                            key={task.id}
                        />
                    ))}
            </div>
        </div>
        
    )
}

export default Column