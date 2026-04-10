import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function FabLab() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = t('fablab.items', { returnObjects: true })

  return (
    <section
      id="fablab"
      className="section"
      ref={ref}
      style={{
        background: 'var(--bg-section)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-10%',
        transform: 'translateY(-50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(ellipse, rgba(91,155,213,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label">{t('fablab.label')}</div>
            <h2 className="section-title">{t('fablab.title')}</h2>
            <div className="divider" />
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              {t('fablab.subtitle')}
            </p>
            <a href="#contactos" className="btn-primary">
              {t('fablab.cta')} →
            </a>
          </motion.div>

          {/* Right — capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}>
              {/* Header bar */}
              <div style={{
                background: 'rgba(91,155,213,0.08)',
                borderBottom: '1px solid var(--border)',
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue-water)', opacity: 0.7 }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                  fab_lab.capacidades
                </span>
              </div>

              {/* Items */}
              <div style={{ padding: '1.5rem' }}>
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.85rem 0',
                      borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '3px',
                      background: 'rgba(122,182,72,0.1)',
                      border: '1px solid rgba(122,182,72,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ color: 'var(--green-light)', fontSize: '0.7rem', fontFamily: 'DM Mono, monospace' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item}</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--green-light)', fontSize: '0.7rem' }}>✓</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #fablab .container > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
