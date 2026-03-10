import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Games from './pages/Games'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import WaterfallGame from './games/waterfall/WaterfallGame'
import AgileGame from './games/agile/AgileGame'
import ScrumGame from './games/scrum/ScrumGame'
import DevOpsGame from './games/devops/DevOpsGame'
import KanbanGame from './games/kanban/KanbanGame'
import BddGame from './games/bdd/BddGame'
import RupGame from './games/rup/RupGame'
import LeanGame from './games/lean/LeanGame'
import XpGame from './games/xp/XpGame'
import TddGame from './games/tdd/TddGame'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="games" element={<Games />} />
        <Route path="games/waterfall" element={<WaterfallGame />} />
        <Route path="games/agile" element={<AgileGame />} />
        <Route path="games/scrum" element={<ScrumGame />} />
        <Route path="games/devops" element={<DevOpsGame />} />
        <Route path="games/kanban" element={<KanbanGame />} />
        <Route path="games/bdd" element={<BddGame />} />
        <Route path="games/rup" element={<RupGame />} />
        <Route path="games/lean" element={<LeanGame />} />
        <Route path="games/xp" element={<XpGame />} />
        <Route path="games/tdd" element={<TddGame />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
