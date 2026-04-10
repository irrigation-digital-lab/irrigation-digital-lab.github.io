import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    name: 'WaterQb',
    desc: 'Ferramenta de apoio à gestão da rega com base em necessidades hídricas das culturas.',
    tags: ['Gestão Hídrica', 'Decisão'],
    color: 'var(--blue-water)',
  },
  {
    name: 'HubIS',
    desc: 'Plataforma de integração de dados de monitorização para sistemas de rega.',
    tags: ['IoT', 'Dados'],
    color: 'var(--green-light)',
  },
  {
    name: 'Path4Med',
    desc: 'Soluções para a resiliência hídrica em contexto mediterrânico.',
    tags: ['Clima', 'Mediterrâneo'],
    color: 'var(--earth)',
  },
  {
    name: 'Clepsydra',
    desc: 'Modelação e simulação de cenários de rega e gestão da água.',
    tags: ['Modelação', 'Simulação'],
    color: 'var(--green-primary)',
  },
]

export default function Projects() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="projetos"
      className="section"
      ref={ref}
      style={{
        background: 'var(--bg-section)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="section-label">{t('projects.label')}</div>
          <h2 className="section-title">{t('projects.title')}</h2>
          <div className="divider" />
          <p className="section-subtitle">{t('projects.subtitle')}</p>
        </motion.div>

        {/* Projects grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="card"
              style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}
            >
              {/* Left border accent */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '3px',
                background: proj.color,
              }} />

              <div style={{ paddingLeft: '0.5rem' }}>
                {/* Project name */}
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.6rem',
                  color: proj.color,
                  marginBottom: '0.75rem',
                  fontStyle: 'italic',
                }}>
                  {proj.name}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem',
                }}>
                  {proj.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {proj.tags.map((tag, j) => (
                    <span key={j} style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.65rem',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-light)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '2px',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    color: proj.color,
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'gap 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.gap = '0.7rem'}
                  onMouseLeave={e => e.currentTarget.style.gap = '0.4rem'}
                >
                  {t('projects.cta')} →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #projetos .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
