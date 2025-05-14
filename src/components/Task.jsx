import { Button } from 'react-bootstrap'

function Task({ data, handleDragging }) {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text', `${data.id}`);
        handleDragging(true);
      };

    const handleDragEnd = () => handleDragging(false)

    return (
        <div className="task" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <p>{data.content}</p>
            <Button variant="link" size="sm" className="p-0 text-secondary" >
                <i className="bi bi-box-arrow-up-right"></i>
            </Button>
        </div>
    )
}

export default Task