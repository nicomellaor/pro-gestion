import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Backlog from './pages/Backlog'
import Sprints from './pages/Sprints'
import Kanban from './pages/Kanban'
import LogIn from './pages/LogIn'

function App() {
  return (
    <div className='bg-dark text-light min-vh-100 p-3'>
      <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="/projects" element={<Home />}></Route>
        <Route path="/backlog" element={<Backlog />}></Route>
        <Route path="/sprints" element={<Sprints />}></Route>
        <Route path="/kanban" element={<Kanban />}></Route>
      </Routes>
    </div>
  )
}

export default App