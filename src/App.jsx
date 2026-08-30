import { HashRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import WaterCursor from './components/WaterCursor'
import BackToTop from './components/BackToTop'
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
import FabLabPage from './pages/FabLabPage'
import TRL34Page from './pages/TRL34Page'
import TRL45Page from './pages/TRL45Page'
import TRL56Page from './pages/TRL56Page'
import TRL56ResultadosPage from './pages/TRL56ResultadosPage'
import ModelosMetodosPage from './pages/ModelosMetodosPage'

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
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ferramentas" element={<ToolsPage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/disciplinas" element={<DisciplinasPage />} />
        <Route path="/dissertacoes" element={<DissertacoesPage />} />
        <Route path="/modelos-e-metodos" element={<ModelosMetodosPage />} />
        <Route path="/teledeteção" element={<TeledeteçãoPage />} />
        <Route path="/modelação" element={<ModelaçãoPage />} />
        <Route path="/sensores-iot" element={<SensoresIoTPage />} />
        <Route path="/fablab" element={<FabLabPage />} />
        <Route path="/fablab/trl-3-4" element={<TRL34Page />} />
        <Route path="/fablab/trl-4-5" element={<TRL45Page />} />
        <Route path="/fablab/trl-5-6" element={<TRL56Page />} />
        <Route path="/fablab/trl-5-6/resultados" element={<TRL56ResultadosPage />} />
      </Routes>
    </HashRouter>
  )
}
