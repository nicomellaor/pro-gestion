import Task from "./Task"

function ContainerCard({ tasks, state, isDragging, handleDragging, handleUpdateList }) {
    const handleDrop = (e) => {
        e.preventDefault()
        handleUpdateList(+e.dataTransfer.getData('text'), state)
        handleDragging(false)
    }

    const handleDragOver = (e) => e.preventDefault()

    return(
        <div className={`container-card ${isDragging ? 'layout-dragging' : ''}`} onDrop={handleDrop} onDragOver={handleDragOver}>
            <p>{state}</p>
            {
                tasks.map(item => (
                    state === item.state
                    &&
                    <>
                        <Task
                            data={item}
                            key={item.id}
                            handleDragging={handleDragging}
                        />
                    </>
                ))
            }
        </div>
    )
}

export default ContainerCard