import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BarChart3, ChevronDown, Droplets, Waves, X } from 'lucide-react'
import { SectionHeader } from './About'

const RESULT_IMAGES = import.meta.glob(
  '../assets/images/fablab/trl56/resultados/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
)

function resultImage(file) {
  const exts = ['jpg', 'jpeg', 'png', 'webp']
  for (const ext of exts) {
    const src = RESULT_IMAGES[`../assets/images/fablab/trl56/resultados/${file}.${ext}`]
    if (src) return src
  }
  return null
}

const TOPICS = [
  {
    id: 'solo',
    icon: Droplets,
    title: {
      pt: 'Sensores de baixo custo para monitorização da água do solo',
      en: 'Low-cost sensors for soil water monitoring',
    },
    lead: {
      pt: 'Teste de sensores FDR de baixo custo para medição da humidade do solo.',
      en: 'Low-cost FDR sensor test for soil moisture measurement.',
    },
    sections: [
      {
        id: 'vinha',
        title: { pt: 'Vinha do ISA', en: 'ISA vineyard' },
        layout: 'chart-photo',
        bullets: {
          pt: ['Solo de textura pesada', 'Rega gota a gota'],
          en: ['Heavy-textured soil', 'Drip irrigation'],
        },
        slots: [
          { id: 'vinha-grafico', file: 'vinha-grafico', size: 'large', label: { pt: 'Gráfico — transmissor 1', en: 'Chart — transmitter 1' } },
          { id: 'vinha-sonda',   file: 'vinha-sonda',   size: 'small', label: { pt: 'Imagem da sonda', en: 'Probe photo' } },
        ],
      },
      {
        id: 'horto',
        title: { pt: 'Horto do ISA', en: 'ISA vegetable garden' },
        layout: 'chart-photo',
        bullets: {
          pt: ['Hortícolas', 'Solo de textura ligeira', 'Rega gota a gota de alta frequência'],
          en: ['Vegetables', 'Light-textured soil', 'High-frequency drip irrigation'],
        },
        slots: [
          { id: 'horto-grafico',     file: 'horto-grafico',     size: 'large', label: { pt: 'Gráfico — transmissor 2', en: 'Chart — transmitter 2' } },
          { id: 'horto-transmissor', file: 'horto-transmissor', size: 'small', label: { pt: 'Imagem do transmissor', en: 'Transmitter photo' } },
        ],
      },
    ],
  },
  {
    id: 'canais',
    icon: Waves,
    title: {
      pt: 'Sensor de baixo custo para monitorização do nível de água em canais',
      en: 'Low-cost sensor for monitoring water level in canals',
    },
    lead: {
      pt: 'Instalação e teste de um sensor ultrassónico de baixo custo para medição do nível de água em canais de rega. Colaboração com a Associação de Regantes do Mira.',
      en: 'Installation and testing of a low-cost ultrasonic sensor for measuring water level in irrigation canals. Collaboration with the Mira Irrigation Association.',
    },
    sections: [
      {
        id: 'instalacao',
        title: { pt: 'Instalação em campo', en: 'Field installation' },
        bullets: {
          pt: ['Associação de Regantes do Mira'],
          en: ['Mira Irrigation Association'],
        },
        slots: [
          { id: 'canal-foto-1', file: 'canal-foto-1', label: { pt: 'Foto 1 — instalação', en: 'Photo 1 — installation' } },
          { id: 'canal-foto-2', file: 'canal-foto-2', label: { pt: 'Foto 2 — equipamento', en: 'Photo 2 — equipment' } },
          { id: 'canal-foto-3', file: 'canal-foto-3', label: { pt: 'Foto 3 — sensor no canal', en: 'Photo 3 — sensor on the canal' } },
          { id: 'canal-foto-4', file: 'canal-foto-4', label: { pt: 'Foto 4 — vista geral', en: 'Photo 4 — overview' } },
        ],
      },
      {
        id: 'dashboard',
        title: { pt: 'SANTA_CLARA — monitorização em tempo real', en: 'SANTA_CLARA — real-time monitoring' },
        bullets: {
          pt: ['Nível de água', 'Série temporal', 'Metadados da estação'],
          en: ['Water depth', 'Time series', 'Station metadata'],
        },
        slots: [
          { id: 'canal-dashboard', file: 'canal-dashboard', wide: true, label: { pt: 'Dashboard — captura de ecrã', en: 'Dashboard — screenshot' } },
        ],
      },
    ],
  },
]

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
        type="button"
        onClick={onClose}
        aria-label="Close"
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
        alt={image.alt}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 'min(1100px, 92vw)',
          maxHeight: '88vh',
          objectFit: 'contain',
          borderRadius: '6px',
          cursor: 'default',
        }}
      />
    </motion.div>
  )
}

function MediaSlot({ slot, lang, onImageClick }) {
  const src = resultImage(slot.file)
  const label = slot.label[lang]
  const isLarge = slot.size === 'large' || slot.wide

  if (!src) {
    return (
      <div style={{
        border: '1px dashed hsl(var(--border))',
        borderRadius: '6px',
        background: 'hsl(var(--secondary) / 0.45)',
        minHeight: isLarge ? '260px' : '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'hsl(var(--muted-foreground) / 0.65)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.62rem',
        letterSpacing: '0.08em',
        textAlign: 'center',
        padding: '1rem',
        gridColumn: slot.wide ? '1 / -1' : 'auto',
      }}>
        {label}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onImageClick({ src, alt: label })}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '100%',
        minHeight: slot.wide ? '360px' : isLarge ? '280px' : '200px',
        padding: 0,
        border: '1px solid hsl(var(--border))',
        borderRadius: '6px',
        overflow: 'hidden',
        background: 'hsl(var(--secondary) / 0.35)',
        cursor: 'zoom-in',
        gridColumn: slot.wide ? '1 / -1' : 'auto',
      }}
    >
      <img
        src={src}
        alt={label}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
    </button>
  )
}

function TopicCard({ topic, lang, open, onToggle, index, inView, onImageClick }) {
  const Icon = topic.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
      style={{
        border: `1px solid ${open ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--border))'}`,
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'hsl(var(--background))',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.5rem 1.75rem',
          background: open ? 'hsl(var(--secondary) / 0.5)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'hsl(var(--secondary) / 0.35)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = open ? 'hsl(var(--secondary) / 0.5)' : 'transparent' }}
      >
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'hsl(var(--primary) / 0.1)',
          border: '1px solid hsl(var(--primary) / 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'hsl(var(--primary))',
          flexShrink: 0,
        }}>
          <Icon size={18} strokeWidth={1.6} />
        </div>
        <h3 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.05rem',
          fontWeight: 600,
          color: 'hsl(var(--foreground))',
          letterSpacing: '-0.01em',
          lineHeight: 1.4,
          margin: 0,
          flex: 1,
        }}>
          {topic.title[lang]}
        </h3>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ flexShrink: 0, color: 'hsl(var(--muted-foreground))' }}
        >
          <ChevronDown size={18} strokeWidth={1.8} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 1.75rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              borderTop: '1px solid hsl(var(--border))',
              paddingTop: '1.5rem',
            }}>
              {topic.lead && (
                <p style={{
                  fontSize: '0.88rem',
                  color: 'hsl(var(--muted-foreground))',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {topic.lead[lang]}
                </p>
              )}

              {topic.sections.map((section) => (
                <div
                  key={section.id}
                  style={{
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    padding: '1.25rem 1.35rem',
                    background: 'hsl(var(--secondary) / 0.25)',
                  }}
                >
                  <h4 style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: 'hsl(var(--foreground))',
                    margin: '0 0 0.75rem',
                  }}>
                    {section.title[lang]}
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}>
                    {section.bullets[lang].map((item) => (
                      <li key={item} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        fontSize: '0.82rem',
                        color: 'hsl(var(--muted-foreground))',
                        lineHeight: 1.5,
                      }}>
                        <span style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: 'hsl(var(--primary))',
                          flexShrink: 0,
                          marginTop: '0.45rem',
                        }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: section.layout === 'chart-photo'
                      ? '2fr 1fr'
                      : section.slots.some(s => s.wide) ? '1fr' : '1fr 1fr',
                    gap: '0.75rem',
                    alignItems: 'stretch',
                  }}>
                    {section.slots.map((slot) => (
                      <MediaSlot
                        key={slot.id}
                        slot={slot}
                        lang={lang}
                        onImageClick={onImageClick}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function TRL56Resultados() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'
  const navigate = useNavigate()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [openId, setOpenId] = useState(null)
  const [lightboxImage, setLightboxImage] = useState(null)

  const label = 'Fab Lab · TRL 5–6'
  const back = lang === 'pt' ? 'Voltar ao TRL 5–6' : 'Back to TRL 5–6'
  const title = lang === 'pt' ? 'Resultados' : 'Results'

  return (
    <section
      className="section"
      ref={ref}
      style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', flex: 1 }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number="" label={label} />

        <a
          href="#/fablab/trl-5-6"
          onClick={(e) => { e.preventDefault(); navigate('/fablab/trl-5-6') }}
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.25rem' }}
        >
          <BarChart3 size={22} strokeWidth={1.6} style={{ color: 'hsl(var(--primary))' }} />
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'hsl(var(--foreground))',
            lineHeight: 1.25,
            margin: 0,
          }}>
            {title}
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {TOPICS.map((topic, i) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              lang={lang}
              index={i}
              inView={inView}
              open={openId === topic.id}
              onToggle={() => setOpenId(openId === topic.id ? null : topic.id)}
              onImageClick={setLightboxImage}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
