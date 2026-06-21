import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import WaterCursor from './components/WaterCursor'
import Hero from './components/Hero'
import About from './components/About'
import Areas from './components/Areas'
import WhatWeDo from './components/WhatWeDo'
import FabLab from './components/FabLab'
import Partners from './components/Partners'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ToolsPage from './pages/ToolsPage'
import ProjectsPage from './pages/ProjectsPage'
import DisciplinasPage from './pages/DisciplinasPage'
import DissertacoesPage from './pages/DissertacoesPage'
import TeledeteçãoPage from './pages/TeledeteçãoPage'
import ModelaçãoPage from './pages/ModelaçãoPage'
import SensoresIoTPage from './pages/SensoresIoTPage'

function HomePage() {
  return (
    <>
      <WaterCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Areas />
        <WhatWeDo />
        <FabLab />
<Partners />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ferramentas" element={<ToolsPage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/disciplinas" element={<DisciplinasPage />} />
        <Route path="/dissertacoes" element={<DissertacoesPage />} />
        <Route path="/teledeteção" element={<TeledeteçãoPage />} />
        <Route path="/modelação" element={<ModelaçãoPage />} />
        <Route path="/sensores-iot" element={<SensoresIoTPage />} />
      </Routes>
    </HashRouter>
  )
}
