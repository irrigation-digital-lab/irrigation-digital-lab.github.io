import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, MapPin, Wifi, CalendarDays, GitCompare, Target, FlaskConical } from 'lucide-react'
import { SectionHeader } from './About'

// Imagens — adicionar a src/assets/images/fablab/ e descomentar
// import vinha      from '../assets/images/fablab/trl56-vinha.jpg'
// import sensores   from '../assets/images/fablab/trl56-sensores.jpg'
// import comparacao from '../assets/images/fablab/trl56-comparacao.jpg'

// ── Data ──────────────────────────────────────────────────────────────────────
const STAGES = [
  {
    id: 'instalacao',
    num: '1',
    icon: MapPin,
    title: {
      pt: 'Instalação na vinha do ISA',
      en: 'Installation at the ISA vineyard',
    },
    images: [
      // { src: vinha, alt: 'Sensor installation at the ISA vineyard' },
    ],
    bullets: {
      pt: ['Instalação dos sensores em campo', 'Integração na parcela de vinha', 'Ligação ao sistema de monitorização'],
      en: ['Field sensor installation', 'Integration in the vineyard plot', 'Connection to the monitoring system'],
    },
  },
  {
    id: 'condicoes-reais',
    num: '2',
    icon: Wifi,
    title: {
      pt: 'Sensores em condições reais',
      en: 'Sensors under real conditions',
    },
    images: [
      // { src: sensores, alt: 'Low-cost sensors operating along the irrigation lines' },
    ],
    bullets: {
      pt: ['Sensores de baixo custo em funcionamento', 'Monitorização junto às linhas de rega', 'Observação em ambiente agrícola real'],
      en: ['Low-cost sensors in operation', 'Monitoring along the irrigation lines', 'Observation in a real agricultural environment'],
    },
  },
  {
    id: 'epoca-rega',
    num: '3',
    icon: CalendarDays,
    title: {
      pt: 'Acompanhamento da época de rega',
      en: 'Irrigation season monitoring',
    },
    images: [],
    bullets: {
      pt: ['Acompanhamento ao longo da campanha', 'Registo contínuo das leituras', 'Avaliação da resposta ao humedecimento do solo'],
      en: ['Monitoring throughout the campaign', 'Continuous reading records', 'Assessment of the response to soil wetting'],
    },
  },
  {
    id: 'comparacao',
    num: '4',
    icon: GitCompare,
    title: {
      pt: 'Comparação com referência comercial',
      en: 'Comparison with a commercial reference',
    },
    images: [
      // { src: comparacao, alt: 'Low-cost sensor vs Sentek EnviroSCAN readings', label: { pt: 'Sensor low cost vs EnviroSCAN', en: 'Low-cost sensor vs EnviroSCAN' } },
    ],
    bullets: {
      pt: ['Comparação com o sensor comercial', 'EnviroSCAN da Sentek como referência', 'Análise da coerência entre leituras'],
      en: ['Comparison with the commercial sensor', 'Sentek EnviroSCAN as reference', 'Analysis of reading consistency'],
    },
  },
  {
    id: 'resultado',
    num: '5',
    icon: Target,
    final: true,
    title: {
      pt: 'Resultado da fase',
      en: 'Phase outcome',
    },
    images: [],
    bullets: {
      pt: ['Teste em ambiente relevante e operacional', 'Avaliação do desempenho dos sensores low cost', 'Base para validação avançada e demonstração'],
      en: ['Testing in a relevant and operational environment', 'Performance assessment of low-cost sensors', 'Basis for advanced validation and demonstration'],
    },
  },
]

// ── Stage card ────────────────────────────────────────────────────────────────
function StageCard({ stage, lang, index, inView }) {
  const Icon = stage.icon
  const accentColor = stage.final ? 'hsl(var(--accent))' : 'hsl(var(--primary))'
  const hasImages = stage.images?.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
      style={{
        background: 'hsl(var(--background))',
        border: `1px solid ${stage.final ? 'hsl(var(--accent) / 0.4)' : 'hsl(var(--border))'}`,
        borderRadius: '8px',
        padding: '1.5rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Number */}
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: accentColor,
        color: 'hsl(var(--background))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.75rem',
        fontWeight: 600,
        alignSelf: 'center',
      }}>
        {stage.num}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: stage.final ? accentColor : 'hsl(var(--foreground))',
        letterSpacing: '-0.01em',
        lineHeight: 1.4,
        textAlign: 'center',
        margin: 0,
      }}>
        {stage.num}. {stage.title[lang]}
      </h3>

      {/* Images (stacked) or icon */}
      {hasImages ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {stage.images.map((img, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {img.label && (
                <span style={{
                  position: 'absolute',
                  top: '0.4rem',
                  left: '0.4rem',
                  zIndex: 1,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.56rem',
                  letterSpacing: '0.05em',
                  color: '#fff',
                  background: 'rgba(0,0,0,0.55)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '3px',
                }}>
                  {img.label[lang]}
                </span>
              )}
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: '110px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  border: '1px solid hsl(var(--border))',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          height: '110px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: stage.final ? 'hsl(var(--accent) / 0.1)' : 'hsl(var(--secondary))',
            border: `1px solid ${stage.final ? 'hsl(var(--accent) / 0.3)' : 'hsl(var(--border))'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accentColor,
          }}>
            <Icon size={26} strokeWidth={1.5} />
          </div>
        </div>
      )}

      {/* Bullets */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {stage.bullets[lang].map((item, i) => (
          <li key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            fontSize: '0.74rem',
            color: 'hsl(var(--muted-foreground))',
            lineHeight: 1.55,
          }}>
            <span style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: accentColor,
              flexShrink: 0,
              marginTop: '0.42rem',
            }} />
            {item}
          </li>
        ))}
      </ul>

      {/* Final TRL badge */}
      {stage.final && (
        <div style={{
          marginTop: 'auto',
          padding: '0.5rem 0.75rem',
          background: 'hsl(var(--accent) / 0.1)',
          border: '1px solid hsl(var(--accent) / 0.3)',
          borderRadius: '4px',
          textAlign: 'center',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: 'hsl(var(--accent))',
        }}>
          TRL 5–6
        </div>
      )}
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TRL56() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'
  const navigate = useNavigate()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const label    = 'Fab Lab · TRL 5–6'
  const back     = lang === 'pt' ? 'Voltar ao Fab Lab' : 'Back to Fab Lab'
  const title    = lang === 'pt'
    ? 'TRL 5–6 — Teste em condições reais'
    : 'TRL 5–6 — Testing under real conditions'
  const subtitle = lang === 'pt'
    ? 'Monitorização na vinha do ISA'
    : 'Monitoring at the ISA vineyard'
  const scheme   = lang === 'pt' ? 'Esquema metodológico' : 'Methodological scheme'
  const note     = lang === 'pt'
    ? 'Na vinha do ISA acompanha-se uma época de rega com sensores de baixo custo, comparando as suas leituras com as de um sensor comercial EnviroSCAN da Sentek.'
    : 'At the ISA vineyard, an irrigation season is monitored with low-cost sensors, comparing their readings with those of a commercial Sentek EnviroSCAN sensor.'

  return (
    <section
      className="section"
      ref={ref}
      style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden', flex: 1 }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number="" label={label} />

        {/* Back to Fab Lab */}
        <a
          href="#/fablab"
          onClick={(e) => { e.preventDefault(); navigate('/fablab') }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '-2.5rem',
            marginBottom: '2.5rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'hsl(var(--muted-foreground))',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'hsl(var(--primary))'}
          onMouseLeave={e => e.currentTarget.style.color = 'hsl(var(--muted-foreground))'}
        >
          <ArrowLeft size={13} strokeWidth={1.8} />
          {back}
        </a>

        {/* Title + TRL badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'hsl(var(--foreground))',
            lineHeight: 1.25,
            maxWidth: '720px',
            marginBottom: '0.5rem',
          }}>
            {title}
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.05rem',
            fontWeight: 600,
            color: 'hsl(var(--foreground))',
            marginBottom: '0.5rem',
          }}>
            {subtitle}
          </p>
          <p style={{
            fontSize: '0.85rem',
            fontStyle: 'italic',
            color: 'hsl(var(--muted-foreground))',
          }}>
            {scheme}
          </p>
        </motion.div>

        {/* Pipeline — 5 stages with arrows */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr auto 1fr',
          gap: '0.4rem',
          alignItems: 'stretch',
          marginBottom: '2.5rem',
        }}>
          {STAGES.map((stage, i) => (
            <div key={stage.id} style={{ display: 'contents' }}>
              <StageCard stage={stage} lang={lang} index={i} inView={inView} />
              {i < STAGES.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'hsl(var(--primary))',
                  }}
                >
                  <ArrowRight size={16} strokeWidth={2} />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.85 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            padding: '1.5rem 1.75rem',
            border: '1px solid hsl(var(--primary) / 0.25)',
            borderRadius: '8px',
            background: 'hsl(var(--secondary) / 0.4)',
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'hsl(var(--primary) / 0.08)',
            border: '1px solid hsl(var(--primary) / 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'hsl(var(--primary))',
            flexShrink: 0,
          }}>
            <FlaskConical size={20} strokeWidth={1.5} />
          </div>
          <p style={{
            fontSize: '0.88rem',
            color: 'hsl(var(--foreground))',
            lineHeight: 1.7,
            fontWeight: 500,
            margin: 0,
          }}>
            {note}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
