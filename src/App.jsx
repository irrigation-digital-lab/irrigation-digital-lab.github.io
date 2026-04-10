import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Areas from './components/Areas'
import WhatWeDo from './components/WhatWeDo'
import FabLab from './components/FabLab'
import Tools from './components/Tools'
import Projects from './components/Projects'
import Partners from './components/Partners'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Areas />
        <WhatWeDo />
        <FabLab />
        <Tools />
        <Projects />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
