import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from './About'
import { BarChart2, Calendar, Droplets, Map, FlaskConical } from 'lucide-react'

const toolIcons = [BarChart2, Calendar, Droplets, Map, FlaskConical]

export default function Tools() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = t('tools.items', { returnObjects: true })

  return (
    <section id="ferramentas" className="section" ref={ref} style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number="05" label={t('tools.label')} />

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
            marginBottom: '0.75rem',
          }}>
            {t('tools.title')}
          </h2>
          <p style={{
            fontSize: '0.9rem',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '520px',
          }}>
            {t('tools.subtitle')}
          </p>
        </motion.div>

        {/* Tools grid — 2 cols like base44 ResourcesSection */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          background: 'hsl(var(--border) / 0.5)',
          border: '1px solid hsl(var(--border))',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          {items.map((tool, i) => {
            const Icon = toolIcons[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  background: 'hsl(var(--background))',
                  padding: '2rem 2.5rem',
                  transition: 'background 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'hsl(var(--secondary) / 0.5)'
                  e.currentTarget.querySelector('.tool-cta').style.opacity = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'hsl(var(--background))'
                  e.currentTarget.querySelector('.tool-cta').style.opacity = '0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <Icon size={20} strokeWidth={1.5} color="hsl(var(--primary))" />
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    color: 'hsl(var(--muted-foreground) / 0.5)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    {tool.tag}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'hsl(var(--foreground))',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.6rem',
                }}>
                  {tool.title}
                </h3>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'hsl(var(--muted-foreground))',
                  lineHeight: 1.65,
                  marginBottom: '1.25rem',
                }}>
                  {tool.desc}
                </p>

                <div
                  className="tool-cta"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    color: 'hsl(var(--primary))',
                    opacity: 0,
                    transition: 'opacity 0.25s ease',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('tools.cta')} →
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
