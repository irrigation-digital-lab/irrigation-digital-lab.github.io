import Navbar from '../components/Navbar'
import Tools from '../components/Tools'
import Footer from '../components/Footer'
import WaterCursor from '../components/WaterCursor'

export default function ToolsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WaterCursor />
      <Navbar subpage />
      <main style={{ paddingTop: '72px', flex: 1 }}>
        <Tools hideNumber />
      </main>
      <Footer />
    </div>
  )
}
