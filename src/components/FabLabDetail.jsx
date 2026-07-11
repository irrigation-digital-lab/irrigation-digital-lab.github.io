import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Radio, Settings, Box, Wrench, Crosshair, ClipboardCheck } from 'lucide-react'
import { SectionHeader } from './About'
import GhostImage from './GhostImage'
import fundo from '../assets/images/fablab/fundo.png'

// ── Data ──────────────────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    id: 'sensores',
    icon: Radio,
    title: { pt: 'Sensores', en: 'Sensors' },
    desc: {
      pt: 'Medição precisa do solo, água e ambiente.',
      en: 'Precise measurement of soil, water and environment.',
    },
    route: '/sensores-iot',
  },
  {
    id: 'automacao',
    icon: Settings,
    title: { pt: 'Automação', en: 'Automation' },
    desc: {
      pt: 'Controlo inteligente de rega em tempo real.',
      en: 'Real-time intelligent irrigation control.',
    },
  },
  {
    id: 'prototipagem',
    icon: Box,
    title: { pt: 'Prototipagem', en: 'Prototyping' },
    desc: {
      pt: 'Soluções personalizadas.',
      en: 'Custom solutions.',
    },
  },
]

const TRL_STAGES = [
  {
    id: 'trl-3-4',
    tag: 'TRL 3–4',
    icon: Wrench,
    route: '/fablab/trl-3-4',
    title: {
      pt: 'Montagem e prova de conceito',
      en: 'Assembly and proof of concept',
    },
  },
  {
    id: 'trl-4-5',
    tag: 'TRL 4–5',
    icon: Crosshair,
    route: '/fablab/trl-4-5',
    title: {
      pt: 'Validação e calibração em ambiente controlado',
      en: 'Validation and calibration in a controlled environment',
    },
  },
  {
    id: 'trl-5-6',
    tag: 'TRL 5–6',
    icon: ClipboardCheck,
    route: '/fablab/trl-5-6',
    title: {
      pt: 'Validação em ambiente relevante e demonstração em ambiente operacional',
      en: 'Validation in a relevant environment and demonstration in an operational environment',
    },
  },
]

// ── Main component ────────────────────────────────────────────────────────────
export default function FabLabDetail() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'
  const navigate = useNavigate()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const label     = lang === 'pt' ? 'Fab Lab' : 'Fab Lab'
  const subtitle  = lang === 'pt'
    ? 'Prototipagem, sensores e automação para a rega inteligente.'
    : 'Prototyping, sensors and automation for smart irrigation.'
  const whatWeDo  = lang === 'pt' ? 'O que fazemos' : 'What we do'

  return (
    <section
      className="section"
      ref={ref}
      style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden', flex: 1 }}
    >
      <GhostImage
        src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1400&q=80"
        side="left"
        opacity={0.1}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number="" label={label} />

        {/* ── Hero: title + collage image ─────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 0.85fr) 1.7fr',
          gap: '2.5rem',
          alignItems: 'center',
          marginBottom: '4rem',
        }}>

          {/* Left — title */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'hsl(var(--foreground))',
              lineHeight: 1.05,
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>
              Fab Lab<br />de Rega
            </h1>
            <div style={{ width: '3rem', height: '2px', background: 'hsl(var(--primary))', marginBottom: '1.5rem' }} />
            <p style={{
              fontSize: '0.9rem',
              color: 'hsl(var(--muted-foreground))',
              lineHeight: 1.8,
              maxWidth: '320px',
            }}>
              {subtitle}
            </p>
          </motion.div>

          {/* Right — collage image */}
          <motion.img
            src={fundo}
            alt="Fab Lab de Rega — prototipagem, sensores e automação"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              display: 'block',
            }}
          />
        </div>

        {/* ── Capability cards ─────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'hsl(var(--border))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '4.5rem',
        }}>
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                onClick={cap.route ? () => navigate(cap.route) : undefined}
                style={{
                  background: 'linear-gradient(hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.05)), hsl(var(--background))',
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  cursor: cap.route ? 'pointer' : 'default',
                  transition: 'background 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(hsl(var(--primary) / 0.11), hsl(var(--primary) / 0.11)), hsl(var(--background))'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'linear-gradient(hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.05)), hsl(var(--background))'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'hsl(var(--primary) / 0.1)',
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'hsl(var(--primary))',
                }}>
                  <Icon size={17} strokeWidth={1.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: 'hsl(var(--foreground))',
                    letterSpacing: '-0.01em',
                    marginBottom: '0.35rem',
                  }}>
                    {cap.title[lang]}
                  </h3>
                  <p style={{
                    fontSize: '0.78rem',
                    color: 'hsl(var(--muted-foreground))',
                    lineHeight: 1.6,
                  }}>
                    {cap.desc[lang]}
                  </p>
                </div>
                <span style={{ color: 'hsl(var(--primary))', fontSize: '0.85rem', alignSelf: 'center' }}>→</span>
              </motion.div>
            )
          })}
        </div>

        {/* ── O que fazemos — label à esquerda + balões TRL ────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(140px, 0.5fr) repeat(3, 1fr)',
          gap: '1rem',
          alignItems: 'stretch',
        }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '0.6rem',
              paddingRight: '1rem',
              borderRight: '1px solid hsl(var(--border))',
            }}
          >
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'hsl(var(--primary))',
              fontWeight: 500,
            }}>
              {whatWeDo}
            </span>
            <div style={{ width: '1.5rem', height: '2px', background: 'hsl(var(--primary))' }} />
          </motion.div>

          {/* Balões TRL — cada um será uma página dedicada */}
          {TRL_STAGES.map((stage, i) => {
            const Icon = stage.icon
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                onClick={stage.route ? () => navigate(stage.route) : undefined}
                style={{
                  background: 'hsl(var(--secondary) / 0.5)',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  padding: '1.25rem 1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: stage.route ? 'pointer' : 'default',
                  transition: 'background 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'hsl(var(--primary) / 0.08)'
                  e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.35)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'hsl(var(--secondary) / 0.5)'
                  e.currentTarget.style.borderColor = 'hsl(var(--border))'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--primary) / 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'hsl(var(--primary))',
                  flexShrink: 0,
                }}>
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.66rem',
                    letterSpacing: '0.1em',
                    color: 'hsl(var(--primary))',
                    fontWeight: 500,
                    display: 'block',
                    marginBottom: '0.3rem',
                  }}>
                    {stage.tag}
                  </span>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: 'hsl(var(--foreground))',
                    lineHeight: 1.5,
                  }}>
                    {stage.title[lang]}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
