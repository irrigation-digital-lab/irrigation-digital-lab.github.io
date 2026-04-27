import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from './About'
import { BookOpen, FlaskConical, Presentation } from 'lucide-react'

const pillarIcons = [BookOpen, FlaskConical, Presentation]

export default function WhatWeDo() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = t('whatwedo.items', { returnObjects: true })

  return (
    <section
      id="oque-fazemos"
      className="section"
      ref={ref}
      style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden' }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number="03" label={t('whatwedo.label')} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'hsl(var(--foreground))',
          }}>
            {t('whatwedo.title')}
          </h2>
        </motion.div>

        {/* Three pillars */}
        <div className="grid-3col" style={{
          gap: '1px',
          background: 'hsl(var(--border))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          {items.map((pillar, i) => {
            const Icon = pillarIcons[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{
                  background: 'hsl(var(--background))',
                  padding: '2.5rem 2rem',
                  transition: 'background 0.25s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'hsl(var(--secondary))'}
                onMouseLeave={e => e.currentTarget.style.background = 'hsl(var(--background))'}
              >
                {/* Icon */}
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  color="hsl(var(--primary))"
                  style={{ marginBottom: '1.5rem' }}
                />

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'hsl(var(--foreground))',
                  letterSpacing: '-0.01em',
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
                        gap: '0.75rem',
                        fontSize: '0.85rem',
                        color: 'hsl(var(--muted-foreground))',
                      }}
                    >
                      <span style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'hsl(var(--primary) / 0.6)',
                        flexShrink: 0,
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
