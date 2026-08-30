import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WaterCursor from '../components/WaterCursor'
import ModelosMetodos from '../components/ModelosMetodos'

export default function ModelosMetodosPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WaterCursor />
      <Navbar subpage />
      <main style={{ paddingTop: '72px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ModelosMetodos />
      </main>
      <Footer />
    </div>
  )
}
