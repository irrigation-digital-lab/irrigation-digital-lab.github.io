import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const toolIcons = ['📊', '📅', '💧', '🗺️', '🧪']

export default function Tools() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = t('tools.items', { returnObjects: true })

  return (
    <section id="ferramentas" className="section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="section-label">{t('tools.label')}</div>
          <h2 className="section-title">{t('tools.title')}</h2>
          <div className="divider" />
          <p className="section-subtitle">{t('tools.subtitle')}</p>
        </motion.div>

        {/* Tools grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {items.map((tool, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.5rem' }}>{toolIcons[i]}</div>
                <span style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: 'var(--blue-water)',
                  background: 'var(--blue-water-dim)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '2px',
                  border: '1px solid rgba(91,155,213,0.2)',
                }}>
                  {tool.tag}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}>
                {tool.title}
              </h3>

              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                flex: 1,
              }}>
                {tool.desc}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                color: 'var(--green-light)',
                marginTop: '0.5rem',
              }}>
                <span>{t('tools.cta')}</span>
                <span>→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
