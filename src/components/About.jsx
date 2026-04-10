import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function StatCard({ value, label, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        textAlign: 'center',
        padding: '2rem 1.5rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        flex: 1,
        minWidth: '140px',
      }}
    >
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '3rem',
        fontWeight: 700,
        color: 'var(--green-light)',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        {value}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
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
    <section id="sobre" className="section" ref={ref}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label">{t('about.label')}</div>
            <h2 className="section-title">{t('about.title')}</h2>
            <div className="divider" />
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              {t('about.text1')}
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {t('about.text2')}
            </p>

            {/* Accent line */}
            <div style={{
              marginTop: '2rem',
              paddingLeft: '1.25rem',
              borderLeft: '2px solid var(--green-primary)',
            }}>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: 'var(--earth)',
                lineHeight: 1.6,
              }}>
                "{t('about.quote')}"
              </p>
            </div>
          </motion.div>

          {/* Right — stats */}
          <div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <StatCard value={t('about.stat1_value')} label={t('about.stat1_label')} delay={0.1} />
              <StatCard value={t('about.stat2_value')} label={t('about.stat2_label')} delay={0.2} />
              <StatCard value={t('about.stat3_value')} label={t('about.stat3_label')} delay={0.3} />
            </div>

            {/* Decorative data panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '1.5rem',
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ color: 'var(--green-light)', marginBottom: '0.75rem', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                // sistema ativo
              </div>
              {[
                { key: 'ensino', val: 'ativo' },
                { key: 'investigação', val: 'em curso' },
                { key: 'fab_lab', val: 'operacional' },
                { key: 'ferramentas', val: '5 disponíveis' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--blue-water)' }}>{item.key}</span>
                  <span style={{ color: 'var(--green-light)' }}>{item.val}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #sobre .container > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
