import { Button } from 'react-bootstrap'

function Task({ data }) {
  return (
    <div className="task-custom-bg task-custom-py task-custom-lh task-custom-min-height d-flex justify-content-between align-items-center my-2 px-3 rounded-2 gap-3 text-break w-100">
      <p className='mb-0 task-p-styling'>{data.name}</p>
      <Button variant="link" size="sm" className="p-0 text-secondary">
        <i className="bi bi-box-arrow-up-right"></i>
      </Button>
    </div>
  );
}

export default Task