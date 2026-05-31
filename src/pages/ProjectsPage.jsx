import Navbar from '../components/Navbar'
import Projects from '../components/Projects'
import Footer from '../components/Footer'
import WaterCursor from '../components/WaterCursor'

export default function ProjectsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WaterCursor />
      <Navbar subpage />
      <main style={{ paddingTop: '72px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Projects hideNumber fullHeight />
      </main>
      <Footer />
    </div>
  )
}
