import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const icons = ['🌱', '📡', '🛰️', '🌡️', '🧮', '⚡', '🔧', '🤝']

export default function Areas() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = t('areas.items', { returnObjects: true })

  return (
    <section
      id="areas"
      className="section"
      ref={ref}
      style={{ background: 'var(--bg-section)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="section-label">{t('areas.label')}</div>
          <h2 className="section-title">{t('areas.title')}</h2>
          <div className="divider" />
          <p className="section-subtitle">{t('areas.subtitle')}</p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{
                background: 'var(--bg-card)',
                padding: '2rem 1.75rem',
                cursor: 'default',
                transition: 'background 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--bg-card-hover)'
                e.currentTarget.querySelector('.area-accent').style.width = '100%'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.querySelector('.area-accent').style.width = '0%'
              }}
            >
              {/* Number */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1.25rem',
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div style={{
                fontSize: '1.75rem',
                marginBottom: '1rem',
                filter: 'grayscale(20%)',
              }}>
                {icons[i]}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                letterSpacing: '0.01em',
              }}>
                {item.title}
              </h3>

              {/* Desc */}
              <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
              }}>
                {item.desc}
              </p>

              {/* Bottom accent */}
              <div className="area-accent" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '0%',
                height: '2px',
                background: 'var(--green-light)',
                transition: 'width 0.4s ease',
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
