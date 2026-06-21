import { useTranslation } from 'react-i18next'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { X } from 'lucide-react'
import GhostImage from './GhostImage'
import { SectionHeader } from './About'

import sensor1 from '../assets/images/sensores-iot/sensor1.jpg'
import sensor2 from '../assets/images/sensores-iot/sensor2.jpg'
import sensor3 from '../assets/images/sensores-iot/sensor3.jpg'
import sensor4 from '../assets/images/sensores-iot/sensor4.jpg'
import sensor5 from '../assets/images/sensores-iot/sensor5.jpg'
import sensor6 from '../assets/images/sensores-iot/sensor6.jpg'
import sensor7 from '../assets/images/sensores-iot/sensor7.jpg'
import sensor8 from '../assets/images/sensores-iot/sensor8.jpg'
import sensor9 from '../assets/images/sensores-iot/sensor9.jpg'
// import fieldTest1 from '../assets/images/sensores-iot/field-test-1.jpg'
// import fieldTest2 from '../assets/images/sensores-iot/field-test-2.jpg'
// import fieldTest3 from '../assets/images/sensores-iot/field-test-3.jpg'

// ── Data ──────────────────────────────────────────────────────────────────────
const ACTIVITIES = [
  {
    id: 'dragino-config',
    number: '01',
    title: {
      pt: 'Configuração e comissionamento do dispositivo Dragino',
      en: 'Configuration and commissioning of the Dragino device',
    },
    desc: {
      pt: 'Montagem e configuração de dispositivos Dragino LoRa para transmissão de dados de sensores de humidade do solo em tempo real via rede LoRaWAN.',
      en: 'Assembly and configuration of Dragino LoRa devices for real-time soil moisture sensor data transmission over LoRaWAN networks.',
    },
    images: [
      { src: sensor1, alt: 'Dragino LoRa device with soil moisture sensors' },
      { src: sensor2, alt: 'Dragino device configuration' },
      { src: sensor3, alt: 'Dragino commissioning setup' },
    ],
  },
  {
    id: 'tdr-lab',
    number: '02',
    title: {
      pt: 'Avaliação laboratorial: exatidão e reprodutibilidade de sondas TDR',
      en: 'Laboratory assessment: TDR soil moisture probe accuracy and reproducibility',
    },
    desc: {
      pt: 'Testes laboratoriais para avaliação da exatidão e reprodutibilidade de sondas de humidade do solo por reflectometria no domínio do tempo (TDR).',
      en: 'Laboratory tests to assess the accuracy and reproducibility of time-domain reflectometry (TDR) soil moisture probes under controlled conditions.',
    },
    images: [
      { src: sensor4, alt: 'TDR probe laboratory test setup' },
      { src: sensor5, alt: 'TDR probe reproducibility assessment' },
    ],
  },
  {
    id: 'field-test',
    number: '03',
    title: {
      pt: 'Teste de campo e calibração',
      en: 'Field test and calibration',
    },
    desc: {
      pt: 'Instalação e calibração de sensores de humidade do solo em condições reais de campo, integrados em sistemas de rega coletiva.',
      en: 'Installation and calibration of soil moisture sensors under real field conditions, integrated into collective irrigation systems.',
    },
    images: [
      { src: sensor6, alt: 'Field installation of soil moisture sensors' },
      { src: sensor7, alt: 'Sensor installation in irrigation channel' },
      { src: sensor8, alt: 'Field test setup in irrigation system' },
      { src: sensor9, alt: 'Field calibration of soil moisture sensors' },
    ],
  },
]

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ image, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        cursor: 'zoom-out',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '4px',
          color: 'rgba(255,255,255,0.7)',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <X size={16} strokeWidth={1.8} />
      </button>

      <motion.img
        src={image.src}
        alt={image.alt ?? ''}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          objectFit: 'contain',
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.1)',
          cursor: 'default',
          display: 'block',
        }}
      />
    </motion.div>
  )
}

// ── Activity block ────────────────────────────────────────────────────────────
function ActivityBlock({ activity, lang, index, onImageClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const hasImages = activity.images?.length > 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        borderTop: '1px solid hsl(var(--border))',
        paddingTop: '2rem',
        paddingBottom: '2.5rem',
      }}
    >
      {/* Number + title */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          color: 'hsl(var(--muted-foreground) / 0.4)',
          letterSpacing: '0.1em',
          flexShrink: 0,
        }}>
          {activity.number}
        </span>
        <h3 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'hsl(var(--foreground))',
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          {activity.title[lang]}
        </h3>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.84rem',
        color: 'hsl(var(--muted-foreground))',
        lineHeight: 1.75,
        maxWidth: '640px',
        marginBottom: hasImages ? '1.5rem' : 0,
        marginLeft: '1.6rem',
      }}>
        {activity.desc[lang]}
      </p>

      {/* Photo grid */}
      {hasImages && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(activity.images.length, 3)}, 1fr)`,
          gap: '0.75rem',
          marginLeft: '1.6rem',
        }}>
          {activity.images.map((img, i) => (
            <div
              key={i}
              onClick={() => onImageClick(img)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px',
                border: '1px solid hsl(var(--border))',
                cursor: 'zoom-in',
                background: 'hsl(var(--secondary))',
                height: '200px',
              }}
              onMouseEnter={e => { e.currentTarget.querySelector('img').style.opacity = '0.82' }}
              onMouseLeave={e => { e.currentTarget.querySelector('img').style.opacity = '1' }}
            >
              <img
                src={img.src}
                alt={img.alt ?? ''}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'opacity 0.2s ease',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SensoresIoT() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'
  const [lightboxImage, setLightboxImage] = useState(null)

  const label    = lang === 'pt' ? 'Sensores e IoT' : 'Sensors & IoT'
  const subtitle = lang === 'pt'
    ? 'Dados em tempo real para monitorização contínua e automatizada de sistemas de rega — desde a bancada de laboratório até ao campo.'
    : 'Real-time data for continuous and automated monitoring of irrigation systems — from the laboratory bench to the field.'

  return (
    <section
      className="section"
      style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden', flex: 1 }}
    >
      <GhostImage
        src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1400&q=80"
        side="right"
        opacity={0.07}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number="" label={label} />

        {/* Subtitle */}
        <p style={{
          fontSize: '0.88rem',
          color: 'hsl(var(--muted-foreground))',
          lineHeight: 1.75,
          maxWidth: '560px',
          marginBottom: '3rem',
        }}>
          {subtitle}
        </p>

        {/* Activity blocks */}
        <div>
          {ACTIVITIES.map((activity, i) => (
            <ActivityBlock
              key={activity.id}
              activity={activity}
              lang={lang}
              index={i}
              onImageClick={setLightboxImage}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
