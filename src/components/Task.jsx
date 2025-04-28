function Task({ data, handleDragging }) {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text', `${data.id}`);
        handleDragging(true);
      };

    const handleDragEnd = () => handleDragging(false)

    return (
        <div className="task" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <p>{data.content}</p>
        </div>
    )
}

export default Task