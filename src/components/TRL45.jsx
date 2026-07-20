import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Cpu, Layers, Ruler, Droplets, Target,
  Waves, Scale, ClipboardList, ShieldCheck,
} from 'lucide-react'
import { SectionHeader } from './About'

// Secção 1 — Validação dos sensores na oficina
import nosSensores  from '../assets/images/fablab/trl45/trl45-nos-sensores.jpg'
import solo1        from '../assets/images/fablab/trl45/trl45-solo-1.jpg'
import solo2        from '../assets/images/fablab/trl45/trl45-solo-2.jpg'
import sondas1      from '../assets/images/fablab/trl45/trl45-sondas-1.jpg'
import sondas2      from '../assets/images/fablab/trl45/trl45-sondas-2.jpg'
import humedSeco    from '../assets/images/fablab/trl45/trl45-humedecimento-seco.png'
import humedHumido  from '../assets/images/fablab/trl45/trl45-humedecimento-humido.jpg'

// Secção 2 — Calibração de sensores de humidade low cost
import calibPic1   from '../assets/images/fablab/trl45/pic1.jpg'
import calibPic2   from '../assets/images/fablab/trl45/pic2.jpg'
import calibPic3   from '../assets/images/fablab/trl45/pic3.jpg'
import calibPic4   from '../assets/images/fablab/trl45/pic4.jpg'
import calibGrafico from '../assets/images/fablab/trl45/grafico.png'

// ── Data ──────────────────────────────────────────────────────────────────────
const STAGES = [
  {
    id: 'nos-sensores',
    num: '1',
    icon: Cpu,
    title: {
      pt: 'Preparação dos nós sensores',
      en: 'Sensor node preparation',
    },
    images: [
      { src: nosSensores, alt: 'Sensor nodes mounted for workshop validation' },
    ],
    bullets: {
      pt: ['Montagem do transmissor', 'Ligação das sondas', 'Verificação da alimentação'],
      en: ['Transmitter assembly', 'Probe connection', 'Power verification'],
    },
  },
  {
    id: 'solo',
    num: '2',
    icon: Layers,
    title: {
      pt: 'Preparação do solo',
      en: 'Soil preparation',
    },
    images: [
      { src: solo1, alt: 'Soil homogenisation in container' },
      { src: solo2, alt: 'Prepared soil container — initial dry condition' },
    ],
    bullets: {
      pt: ['Homogeneização do solo', 'Preparação do recipiente', 'Condição inicial seca'],
      en: ['Soil homogenisation', 'Container preparation', 'Initial dry condition'],
    },
  },
  {
    id: 'sondas',
    num: '3',
    icon: Ruler,
    title: {
      pt: 'Instalação das sondas',
      en: 'Probe installation',
    },
    images: [
      { src: sondas1, alt: 'Probe insertion in soil containers' },
      { src: sondas2, alt: 'Probe replicates and initial readings' },
    ],
    bullets: {
      pt: ['Inserção das sondas', 'Definição das repetições', 'Leituras iniciais'],
      en: ['Probe insertion', 'Definition of replicates', 'Initial readings'],
    },
  },
  {
    id: 'humedecimento',
    num: '4',
    icon: Droplets,
    title: {
      pt: 'Humedecimento e estabilização',
      en: 'Wetting and stabilisation',
    },
    images: [
      { src: humedSeco,   alt: 'Soil before wetting — dry', label: { pt: 'Antes (seco)', en: 'Before (dry)' } },
      { src: humedHumido, alt: 'Soil after wetting — wet',  label: { pt: 'Depois (húmido)', en: 'After (wet)' } },
    ],
    bullets: {
      pt: ['Adição progressiva de água', 'Estabilização da humidade', 'Acompanhamento das leituras'],
      en: ['Progressive water addition', 'Moisture stabilisation', 'Reading monitoring'],
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
      pt: ['Sensores validados na oficina', 'Resposta observada em diferentes estados de humidade', 'Base para calibração e ensaios seguintes'],
      en: ['Sensors validated in the workshop', 'Response observed at different moisture states', 'Basis for calibration and subsequent trials'],
    },
  },
]

// ── Secção 2 — Calibração ─────────────────────────────────────────────────────
const CALIB_PHOTOS = [
  {
    src: calibPic1,
    alt: 'Field installation of low-cost soil moisture sensors',
    caption: { pt: 'Instalação em campo', en: 'Field installation' },
  },
  {
    src: calibPic2,
    alt: 'Probes installed at two depths in the soil trench',
    caption: { pt: 'Sondas em duas profundidades', en: 'Probes at two depths' },
  },
  {
    src: calibPic3,
    alt: 'Gravimetric sample weighing on precision scale',
    caption: { pt: 'Pesagem da amostra', en: 'Sample weighing' },
  },
  {
    src: calibPic4,
    alt: 'Field sampling and depth measurements',
    caption: { pt: 'Amostragem e medições', en: 'Sampling and measurements' },
  },
]

const CALIB_SUMMARY = [
  {
    icon: Cpu,
    title: { pt: '4 sondas', en: '4 probes' },
    desc:  { pt: 'testadas e calibradas', en: 'tested and calibrated' },
  },
  {
    icon: Waves,
    title: { pt: '2 profundidades', en: '2 depths' },
    desc:  { pt: '(superficial e profunda)', en: '(shallow and deep)' },
  },
  {
    icon: Scale,
    title: { pt: 'Pesagem gravimétrica', en: 'Gravimetric weighing' },
    desc:  { pt: 'padrão de referência', en: 'reference standard' },
  },
  {
    icon: ClipboardList,
    title: { pt: 'Amostragem em campo', en: 'Field sampling' },
    desc:  { pt: 'condições reais', en: 'real conditions' },
  },
  {
    icon: ShieldCheck,
    title: { pt: 'TRL 4–5', en: 'TRL 4–5' },
    desc:  { pt: 'Validação experimental em ambiente relevante', en: 'Experimental validation in a relevant environment' },
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
          TRL 4–5
        </div>
      )}
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TRL45() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'
  const navigate = useNavigate()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const label    = 'Fab Lab · TRL 4–5'
  const back     = lang === 'pt' ? 'Voltar ao Fab Lab' : 'Back to Fab Lab'
  const title    = lang === 'pt'
    ? 'TRL 4–5 — Validação em ambiente laboratorial'
    : 'TRL 4–5 — Validation in a laboratory environment'
  const subtitle = lang === 'pt'
    ? '1. Validação dos sensores na oficina'
    : '1. Sensor validation in the workshop'
  const scheme   = lang === 'pt' ? 'Esquema metodológico' : 'Methodological scheme'

  const calibTitle = lang === 'pt'
    ? '2. Calibração de sensores de humidade low cost'
    : '2. Low-cost soil moisture sensor calibration'
  const calibDesc = lang === 'pt'
    ? 'Instalação, amostragem, pesagem e ajuste de curvas de calibração para sondas de humidade do solo de baixo custo.'
    : 'Installation, sampling, weighing and calibration curve fitting for low-cost soil moisture probes.'
  const calibChartAlt = lang === 'pt'
    ? 'Curvas de calibração das sondas e R² das calibrações'
    : 'Probe calibration curves and calibration R² values'
  const calibStrip = lang === 'pt'
    ? 'Validação experimental em ambiente relevante'
    : 'Experimental validation in a relevant environment'

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
          marginBottom: '4.5rem',
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

        {/* ── Secção 2 — Calibração de sensores de humidade low cost ──── */}
        <div style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '3rem' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.05rem',
            fontWeight: 600,
            color: 'hsl(var(--foreground))',
            marginBottom: '0.5rem',
          }}>
            {calibTitle}
          </p>
          <p style={{
            fontSize: '0.85rem',
            color: 'hsl(var(--muted-foreground))',
            lineHeight: 1.75,
            maxWidth: '560px',
            marginBottom: '2rem',
          }}>
            {calibDesc}
          </p>

          {/* Fotos com legenda */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}>
            {CALIB_PHOTOS.map((photo, i) => (
              <div key={i} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid hsl(var(--border))' }}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={{
                    width: '100%',
                    height: '260px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '0.6rem',
                  left: '0.6rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '0.05em',
                  color: '#fff',
                  background: 'hsl(var(--primary) / 0.9)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '999px',
                }}>
                  {photo.caption[lang]}
                </span>
              </div>
            ))}
          </div>

          {/* Gráfico + Resumo do ensaio */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2.2fr 1fr',
            gap: '1rem',
            alignItems: 'stretch',
            marginBottom: '1.5rem',
          }}>
            <img
              src={calibGrafico}
              alt={calibChartAlt}
              style={{
                width: '100%',
                height: 'auto',
                alignSelf: 'center',
                borderRadius: '8px',
                border: '1px solid hsl(var(--border))',
                display: 'block',
              }}
            />

            <div style={{
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              padding: '1.25rem 1.4rem',
              background: 'hsl(var(--secondary) / 0.4)',
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'hsl(var(--foreground))',
                marginBottom: '1rem',
                textAlign: 'center',
              }}>
                {lang === 'pt' ? 'Resumo do ensaio' : 'Trial summary'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {CALIB_SUMMARY.map((item, i) => {
                  const ItemIcon = item.icon
                  return (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.6rem 0',
                      borderBottom: i < CALIB_SUMMARY.length - 1 ? '1px solid hsl(var(--border) / 0.6)' : 'none',
                    }}>
                      <ItemIcon size={15} strokeWidth={1.6} style={{ color: 'hsl(var(--primary))', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <p style={{
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          color: 'hsl(var(--foreground))',
                          lineHeight: 1.4,
                        }}>
                          {item.title[lang]}
                        </p>
                        <p style={{
                          fontSize: '0.7rem',
                          color: 'hsl(var(--muted-foreground))',
                          lineHeight: 1.5,
                        }}>
                          {item.desc[lang]}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Faixa TRL */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.5rem',
            border: '1px solid hsl(var(--primary) / 0.25)',
            borderRadius: '8px',
            background: 'hsl(var(--primary) / 0.05)',
          }}>
            <ShieldCheck size={20} strokeWidth={1.6} style={{ color: 'hsl(var(--primary))', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'hsl(var(--primary))',
              flexShrink: 0,
            }}>
              TRL 4–5
            </span>
            <span style={{
              fontSize: '0.85rem',
              color: 'hsl(var(--foreground))',
            }}>
              {calibStrip}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
