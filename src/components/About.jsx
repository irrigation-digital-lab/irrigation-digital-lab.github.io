import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function SectionHeader({ number, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.65rem',
        color: 'hsl(var(--muted-foreground) / 0.5)',
        letterSpacing: '0.15em',
      }}>
        {number}
      </span>
      <div style={{ width: '2rem', height: '1px', background: 'hsl(var(--border))' }} />
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.7rem',
        fontWeight: 500,
        color: 'hsl(var(--muted-foreground))',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'hsl(var(--border) / 0.5)' }} />
    </div>
  )
}

function StatCard({ value, label, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        flex: '1 1 100px',
        padding: '1.75rem 1.25rem',
        background: 'hsl(var(--secondary))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '4px',
        textAlign: 'center',
      }}
    >
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '2.75rem',
        fontWeight: 600,
        color: 'hsl(var(--primary))',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.65rem',
        color: 'hsl(var(--muted-foreground))',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </motion.div>
  )
}

export default function About() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sobre" className="section" ref={ref} style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number="01" label={t('about.label')} />

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
              {t('about.title')}
            </h2>

            <p style={{
              fontSize: '0.9rem',
              color: 'hsl(var(--muted-foreground))',
              lineHeight: 1.8,
              marginBottom: '1rem',
            }}>
              {t('about.text1')}
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: 'hsl(var(--muted-foreground))',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}>
              {t('about.text2')}
            </p>

            {/* Quote */}
            <div style={{
              paddingLeft: '1.25rem',
              borderLeft: '2px solid hsl(var(--primary))',
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                fontStyle: 'italic',
                color: 'hsl(var(--foreground) / 0.7)',
                lineHeight: 1.65,
              }}>
                "{t('about.quote')}"
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <div>
            {/* Stats */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <StatCard value={t('about.stat1_value')} label={t('about.stat1_label')} delay={0.1} inView={inView} />
              <StatCard value={t('about.stat2_value')} label={t('about.stat2_label')} delay={0.2} inView={inView} />
              <StatCard value={t('about.stat3_value')} label={t('about.stat3_label')} delay={0.3} inView={inView} />
            </div>

            {/* System status panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                background: 'hsl(var(--secondary))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div style={{
                borderBottom: '1px solid hsl(var(--border))',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'hsl(var(--accent))' }} />
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  color: 'hsl(var(--muted-foreground))',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  {t('about.lines_label')}
                </span>
              </div>
              <div style={{ padding: '1rem 1.25rem' }}>
                {[
                  ...t('about.lines', { returnObjects: true }),
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.4rem 0',
                    borderBottom: i < 3 ? '1px solid hsl(var(--border) / 0.5)' : 'none',
                  }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.7rem',
                      color: 'hsl(var(--primary))',
                    }}>
                      {item.key}
                    </span>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.7rem',
                      color: 'hsl(var(--accent))',
                    }}>
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export { SectionHeader }
