import { useTranslation } from 'react-i18next'
import logo1 from '../assets/images/logo1.png'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2.5rem 0',
      background: 'var(--bg-deep)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logo1} alt="LDR" style={{ height: '28px', opacity: 0.6 }} />
          <span style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}>
            Laboratório Digital de Rega
          </span>
        </div>

        <span style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.08em',
        }}>
          © {year} · {t('footer.rights')}
        </span>
      </div>
    </footer>
  )
}
