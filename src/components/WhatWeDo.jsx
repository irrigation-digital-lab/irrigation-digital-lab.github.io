import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const pillars = [
  { icon: '📚', color: 'var(--green-light)' },
  { icon: '🔬', color: 'var(--blue-water)' },
  { icon: '🌾', color: 'var(--earth)' },
]

export default function WhatWeDo() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = t('whatwedo.items', { returnObjects: true })

  return (
    <section id="oque-fazemos" className="section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="section-label">{t('whatwedo.label')}</div>
          <h2 className="section-title">{t('whatwedo.title')}</h2>
          <div className="divider" />
        </motion.div>

        {/* Three pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {items.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="card"
              style={{ padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}
            >
              {/* Top accent bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: pillars[i].color,
              }} />

              {/* Icon */}
              <div style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>
                {pillars[i].icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.5rem',
                color: pillars[i].color,
                marginBottom: '1.5rem',
              }}>
                {pillar.title}
              </h3>

              {/* Items */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {pillar.items.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: pillars[i].color,
                      flexShrink: 0,
                      opacity: 0.7,
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #oque-fazemos .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
