import Board from "../components/Board"

function Kanban() {
    const sprint = "Sprint #1"
    return (
        <>
            <h1 className="display-4 fw-bold text-center mb-3">Kanban ✅</h1>
            <p className="fs-4 fw-lighter text-center mb-4">{sprint}</p>
            <Board />
        </>
      )
}

export default Kanban