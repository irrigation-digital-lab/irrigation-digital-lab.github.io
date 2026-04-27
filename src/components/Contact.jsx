import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from './About'
import { Mail, MapPin, GraduationCap, ExternalLink } from 'lucide-react'

export default function Contact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contactos"
      className="section"
      ref={ref}
      style={{ borderTop: '1px solid hsl(var(--border))' }}
    >
      <div className="container">
        <SectionHeader number="08" label={t('contact.label')} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '680px' }}
        >
          {/* Name & title */}
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'hsl(var(--foreground))',
            marginBottom: '0.4rem',
            lineHeight: 1.15,
          }}>
            Maria do Rosário Cameira
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            color: 'hsl(var(--muted-foreground))',
            marginBottom: '2rem',
          }}>
            Professora Associada com Agregação · Instituto Superior de Agronomia, Universidade de Lisboa
          </p>

          <div style={{
            width: '2rem',
            height: '1px',
            background: 'hsl(var(--primary))',
            marginBottom: '2rem',
          }} />

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Mail size={15} strokeWidth={1.5} color="hsl(var(--primary))" style={{ flexShrink: 0 }} />
              <a
                href="mailto:roscameira@isa.ulisboa.pt"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.82rem',
                  color: 'hsl(var(--foreground))',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'hsl(var(--primary))'}
                onMouseLeave={e => e.currentTarget.style.color = 'hsl(var(--foreground))'}
              >
                roscameira@isa.ulisboa.pt
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <MapPin size={15} strokeWidth={1.5} color="hsl(var(--primary))" style={{ flexShrink: 0 }} />
              <span style={{
                fontSize: '0.88rem',
                color: 'hsl(var(--muted-foreground))',
              }}>
                Instituto Superior de Agronomia · Lisboa, Portugal
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <GraduationCap size={15} strokeWidth={1.5} color="hsl(var(--primary))" style={{ flexShrink: 0 }} />
              <span style={{
                fontSize: '0.88rem',
                color: 'hsl(var(--muted-foreground))',
              }}>
                Área de Engenharia Rural
              </span>
            </div>

          </div>

          {/* Profile link */}
          <a
            href="https://www.isa.ulisboa.pt/membro-equipa/maria-do-rosario-cameira"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.25rem',
              border: '1px solid hsl(var(--border))',
              borderRadius: '4px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'hsl(var(--muted-foreground))',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'hsl(var(--foreground))'
              e.currentTarget.style.color = 'hsl(var(--foreground))'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'hsl(var(--border))'
              e.currentTarget.style.color = 'hsl(var(--muted-foreground))'
            }}
          >
            <ExternalLink size={12} strokeWidth={1.5} />
            Perfil ISA
          </a>

        </motion.div>
      </div>
    </section>
  )
}
