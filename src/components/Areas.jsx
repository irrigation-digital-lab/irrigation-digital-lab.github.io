import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from './About'
import GhostImage from './GhostImage'

const ICONS = ['🌱', '📡', '🛰️', '🌡️', '🔢', '⚡']

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
      style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden' }}
    >
      {/* Green aerial cropfields — left */}
      <GhostImage
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80"
        side="left"
        opacity={0.13}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number="02" label={t('areas.label')} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'hsl(var(--foreground))',
            marginBottom: '0.75rem',
          }}>
            {t('areas.title')}
          </h2>
          <p style={{
            fontSize: '0.9rem',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '560px',
          }}>
            {t('areas.subtitle')}
          </p>
        </motion.div>

        {/* Grid — gap-px style like base44 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'hsl(var(--border))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{
                background: 'hsl(var(--background))',
                padding: '2rem 1.75rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'hsl(var(--secondary))'
                e.currentTarget.querySelector('.area-bar').style.width = '100%'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'hsl(var(--background))'
                e.currentTarget.querySelector('.area-bar').style.width = '0%'
              }}
            >
              {/* Number */}
              <span style={{
                position: 'absolute',
                top: '1rem',
                right: '1.25rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                color: 'hsl(var(--muted-foreground) / 0.4)',
                letterSpacing: '0.1em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Title with emoji */}
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'hsl(var(--foreground))',
                marginBottom: '0.5rem',
                marginTop: '0.25rem',
                letterSpacing: '-0.01em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ fontSize: '1.1rem' }}>{ICONS[i]}</span>
                {item.title}
              </h3>

              <p style={{
                fontSize: '0.82rem',
                color: 'hsl(var(--muted-foreground))',
                lineHeight: 1.65,
              }}>
                {item.desc}
              </p>

              {/* Bottom accent bar */}
              <div
                className="area-bar"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '0%',
                  height: '2px',
                  background: 'hsl(var(--primary))',
                  transition: 'width 0.35s ease',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
