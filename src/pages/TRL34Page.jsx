import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WaterCursor from '../components/WaterCursor'
import TRL34 from '../components/TRL34'

export default function TRL34Page() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WaterCursor />
      <Navbar subpage />
      <main style={{ paddingTop: '72px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TRL34 />
      </main>
      <Footer />
    </div>
  )
}
