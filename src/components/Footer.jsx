import { useTranslation } from 'react-i18next'
import logoGpt from '../assets/images/logo_gpt.png'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'hsl(var(--foreground))',
      color: 'hsl(var(--background))',
      borderTop: '1px solid hsl(var(--border))',
    }}>
      <div className="container" style={{ padding: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={logoGpt}
              alt="LDR Logo"
              style={{ height: '30px', width: 'auto', opacity: 0.85 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                opacity: 0.9,
                textTransform: 'uppercase',
                lineHeight: 1,
              }}>
                Irrigation
              </span>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.55rem',
                opacity: 0.4,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                lineHeight: 1,
                marginTop: '2px',
              }}>
                Digital Lab
              </span>
            </div>
          </div>

          {/* Copyright */}
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            opacity: 0.3,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            © {year} Irrigation Digital Lab · {t('footer.rights')}
          </span>

          {/* Tagline */}
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.55rem',
            opacity: 0.2,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Built with precision. Managed with care.
          </span>
        </div>
      </div>
    </footer>
  )
}
