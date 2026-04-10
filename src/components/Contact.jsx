import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contactos"
      className="section"
      ref={ref}
      style={{
        background: 'var(--bg-section)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label">{t('contact.label')}</div>
            <h2 className="section-title">{t('contact.title')}</h2>
            <div className="divider" />
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              {t('contact.subtitle')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  background: 'rgba(122,182,72,0.08)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  flexShrink: 0,
                }}>
                  ✉️
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                    {t('contact.email_label')}
                  </div>
                  <a href="mailto:contacto@laboratoriorega.pt" style={{ color: 'var(--green-light)', textDecoration: 'none', fontSize: '0.9rem' }}>
                    contacto@laboratoriorega.pt
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  background: 'rgba(122,182,72,0.08)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  flexShrink: 0,
                }}>
                  📍
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                    {t('contact.location_label')}
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {t('contact.location_value')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              action="https://formspree.io/f/XXXXXXXX"
              method="POST"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {['name', 'email'].map(field => (
                <div key={field}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}>
                    {field === 'name' ? 'Nome' : 'Email'}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '3px',
                      padding: '0.75rem 1rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--green-primary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                  />
                </div>
              ))}

              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>
                  Mensagem
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '3px',
                    padding: '0.75rem 1rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--green-primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                {t('contact.cta')} →
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contactos .container > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
