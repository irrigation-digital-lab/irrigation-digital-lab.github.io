import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WaterCursor from '../components/WaterCursor'
import TRL56Resultados from '../components/TRL56Resultados'

export default function TRL56ResultadosPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WaterCursor />
      <Navbar subpage />
      <main style={{ paddingTop: '72px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TRL56Resultados />
      </main>
      <Footer />
    </div>
  )
}
