import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WaterCursor from '../components/WaterCursor'
import TRL45 from '../components/TRL45'

export default function TRL45Page() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WaterCursor />
      <Navbar subpage />
      <main style={{ paddingTop: '72px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TRL45 />
      </main>
      <Footer />
    </div>
  )
}
