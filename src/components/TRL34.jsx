import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, RadioTower, MonitorCheck, Target,
  KeyRound, Hash, Lock, RefreshCw,
  Cloud, Radio, Box, Database, BarChart3,
} from 'lucide-react'
import { SectionHeader } from './About'

import sensor1 from '../assets/images/sensores-iot/sensor1.jpg'
import sensor3 from '../assets/images/sensores-iot/sensor3.jpg'

// ── Data ──────────────────────────────────────────────────────────────────────
const STAGES = [
  {
    id: 'montagem',
    num: '1',
    image: { src: sensor1, alt: 'Dragino LoRa device with soil moisture probes' },
    title: {
      pt: 'Montagem do sistema sensor',
      en: 'Sensor system assembly',
    },
    bullets: {
      pt: ['Ligação das sondas ao transmissor', 'Verificação das conexões', 'Alimentação e antena', 'Preparação para leitura'],
      en: ['Probe connection to the transmitter', 'Connection verification', 'Power and antenna', 'Reading preparation'],
    },
  },
  {
    id: 'configuracao',
    num: '2',
    image: { src: sensor3, alt: 'Dragino device internal configuration' },
    title: {
      pt: 'Configuração e parametrização',
      en: 'Configuration and parameterisation',
    },
    bullets: {
      pt: ['Configuração via BLE', 'Dragino Devices Tool', 'Definição do intervalo de leitura', 'Endereçamento e parâmetros'],
      en: ['Configuration via BLE', 'Dragino Devices Tool', 'Reading interval definition', 'Addressing and parameters'],
    },
  },
  {
    id: 'lorawan',
    num: '3',
    icon: RadioTower,
    title: {
      pt: 'Ligação à rede LoRaWAN',
      en: 'LoRaWAN network connection',
    },
    chips: [
      { icon: KeyRound, label: 'JoinEUI' },
      { icon: Hash, label: 'DevEUI' },
      { icon: Lock, label: 'AppKey' },
      { icon: RefreshCw, label: 'OTAA' },
    ],
    bullets: {
      pt: ['Registo na TTN', 'Configuração da comunicação', 'Verificação dos uplinks'],
      en: ['Registration on TTN', 'Communication setup', 'Uplink verification'],
    },
  },
  {
    id: 'dados',
    num: '4',
    icon: MonitorCheck,
    title: {
      pt: 'Integração da cadeia de dados',
      en: 'Data chain integration',
    },
    chips: [
      { icon: Cloud, label: 'TTN' },
      { icon: Radio, label: 'MQTT' },
      { icon: Box, label: 'Telegraf' },
      { icon: Database, label: 'InfluxDB' },
      { icon: BarChart3, label: 'Grafana/Mobilab' },
    ],
    bullets: {
      pt: ['Descodificação do payload', 'Armazenamento em séries temporais', 'Visualização em dashboards'],
      en: ['Payload decoding', 'Time-series storage', 'Dashboard visualisation'],
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
    bullets: {
      pt: ['Sistema integrado operacional', 'Dados transmitidos e visualizados', 'Base para a validação laboratorial', 'Prova de conceito tecnológica'],
      en: ['Operational integrated system', 'Data transmitted and visualised', 'Basis for laboratory validation', 'Technological proof of concept'],
    },
  },
]

// ── Stage card ────────────────────────────────────────────────────────────────
function StageCard({ stage, lang, index, inView }) {
  const Icon = stage.icon
  const accentColor = stage.final ? 'hsl(var(--accent))' : 'hsl(var(--primary))'

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

      {/* Image or icon */}
      {stage.image ? (
        <img
          src={stage.image.src}
          alt={stage.image.alt}
          style={{
            width: '100%',
            height: '110px',
            objectFit: 'cover',
            borderRadius: '4px',
            border: '1px solid hsl(var(--border))',
            display: 'block',
          }}
        />
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

      {/* Chips */}
      {stage.chips && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {stage.chips.map((chip, i) => {
            const ChipIcon = chip.icon
            return (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.65rem',
                border: '1px solid hsl(var(--border))',
                borderRadius: '4px',
                background: 'hsl(var(--secondary) / 0.5)',
              }}>
                <ChipIcon size={12} strokeWidth={1.6} style={{ color: 'hsl(var(--primary))', flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.64rem',
                  color: 'hsl(var(--foreground))',
                  letterSpacing: '0.02em',
                }}>
                  {chip.label}
                </span>
              </div>
            )
          })}
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
          TRL 3–4
        </div>
      )}
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TRL34() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'
  const navigate = useNavigate()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const label = lang === 'pt' ? 'Fab Lab · TRL 3–4' : 'Fab Lab · TRL 3–4'
  const back  = lang === 'pt' ? 'Voltar ao Fab Lab' : 'Back to Fab Lab'
  const title = lang === 'pt'
    ? 'Configuração e prova de conceito do sistema integrado sensor–LoRaWAN–plataforma'
    : 'Configuration and proof of concept of the integrated sensor–LoRaWAN–platform system'
  const scheme = lang === 'pt' ? 'Esquema metodológico' : 'Methodological scheme'

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
            marginBottom: '0.75rem',
          }}>
            {title}
          </h2>
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
      </div>
    </section>
  )
}
