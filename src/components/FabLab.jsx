import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from './About'
import GhostImage from './GhostImage'

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
        borderTop: '1px solid hsl(var(--border))',
        background: 'hsl(var(--secondary) / 0.4)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Drip irrigation close-up — left */}
      <GhostImage
        src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1400&q=80"
        side="right"
        opacity={0.14}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number="04" label={t('fablab.label')} />

        <div className="grid-2col" style={{ alignItems: 'start' }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'hsl(var(--foreground))',
              marginBottom: '1.5rem',
              lineHeight: 1.15,
            }}>
              {t('fablab.title')}
            </h2>
            <p style={{
              fontSize: '0.9rem',
              color: 'hsl(var(--muted-foreground))',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}>
              {t('fablab.subtitle')}
            </p>
            <a
              href="#contactos"
              onClick={(e) => { e.preventDefault(); document.getElementById('contactos')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                background: 'hsl(var(--foreground))',
                color: 'hsl(var(--background))',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '4px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {t('fablab.cta')} →
            </a>
          </motion.div>

          {/* Right — capabilities panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div style={{
              background: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              {/* Panel header */}
              <div style={{
                borderBottom: '1px solid hsl(var(--border))',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'hsl(var(--secondary))',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'hsl(var(--primary))' }} />
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  color: 'hsl(var(--muted-foreground))',
                  letterSpacing: '0.12em',
                }}>
                  fab_lab.capabilities
                </span>
              </div>

              {/* Items */}
              <div style={{ padding: '0.5rem 0' }}>
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.9rem 1.25rem',
                      borderBottom: i < items.length - 1 ? '1px solid hsl(var(--border))' : 'none',
                    }}
                  >
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.6rem',
                      color: 'hsl(var(--muted-foreground) / 0.5)',
                      letterSpacing: '0.05em',
                      minWidth: '1.5rem',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontSize: '0.88rem',
                      color: 'hsl(var(--foreground))',
                    }}>
                      {item}
                    </span>
                    <span style={{
                      marginLeft: 'auto',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.65rem',
                      color: 'hsl(var(--accent))',
                    }}>
                      ✓
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
