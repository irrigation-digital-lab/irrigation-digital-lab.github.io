import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from './About'
import GhostImage from './GhostImage'

const projectMeta = [
  { accent: 'hsl(var(--accent))',       url: 'https://prima-hubis.org/' },
  { accent: 'hsl(var(--accent) / 0.7)', url: 'https://clepsydra.interreg-euro-med.eu/' },
  { accent: 'hsl(var(--primary) / 0.6)',url: 'https://www.path4med.eu/' },
  { accent: 'hsl(var(--primary))',       url: null },
]

export default function Projects({ hideNumber = false, fullHeight = false }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="projetos"
      className="section"
      ref={ref}
      style={{
        borderTop: '1px solid hsl(var(--border))',
        background: 'hsl(var(--secondary) / 0.4)',
        position: 'relative',
        overflow: 'hidden',
        ...(fullHeight && { flex: 1 }),
      }}
    >
      {/* Aerial green irrigation field — left */}
      <GhostImage
        src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1400&q=80"
        side="left"
        opacity={0.14}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number={hideNumber ? '' : '06'} label={t('projects.label')} />

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
            {t('projects.title')}
          </h2>
          <p style={{
            fontSize: '0.9rem',
            color: 'hsl(var(--muted-foreground))',
            maxWidth: '520px',
          }}>
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'hsl(var(--border))', border: '1px solid hsl(var(--border))', borderRadius: '4px', overflow: 'hidden' }}>
          {t('projects.items', { returnObjects: true }).map((proj, i) => {
            const meta = projectMeta[i]
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: 'hsl(var(--background))',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.25s ease',
                cursor: meta.url ? 'pointer' : 'default',
              }}
              onClick={() => meta.url && window.open(meta.url, '_blank', 'noopener')}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'hsl(var(--secondary) / 0.5)'
                e.currentTarget.querySelector('.proj-cta').style.opacity = '1'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'hsl(var(--background))'
                e.currentTarget.querySelector('.proj-cta').style.opacity = '0'
              }}
            >
              {/* Left accent bar */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '3px',
                background: meta.accent,
              }} />

              <div style={{ paddingLeft: '0.75rem' }}>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'hsl(var(--foreground))',
                  marginBottom: '0.75rem',
                }}>
                  {proj.name}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'hsl(var(--muted-foreground))',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem',
                }}>
                  {proj.desc}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {proj.tags.map((tag, j) => (
                    <span key={j} style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.6rem',
                      letterSpacing: '0.08em',
                      color: 'hsl(var(--muted-foreground))',
                      border: '1px solid hsl(var(--border))',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '2px',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="proj-cta"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'hsl(var(--primary))',
                    opacity: 0,
                    transition: 'opacity 0.25s ease',
                  }}
                >
                  {meta.url ? `${t('projects.cta')} →` : ''}
                </div>
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
