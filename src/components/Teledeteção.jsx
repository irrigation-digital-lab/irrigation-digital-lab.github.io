import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import { ChevronDown, BookMarked } from 'lucide-react'
import GhostImage from './GhostImage'
import { SectionHeader } from './About'
import soilSalinity from '../assets/images/remote-sensing/soil-salinity-guinea-bissau.png'
import irrigatedAreas from '../assets/images/remote-sensing/irrigated-areas-mediterranean.png'

// ── Data ──────────────────────────────────────────────────────────────────────
const PUBLICATIONS = [
  {
    id: 'soil-salinity-guinea-bissau',
    title: {
      pt: 'Mapeamento de Salinidade do Solo — Guiné-Bissau',
      en: 'Soil Salinity Mapping — Guinea-Bissau',
    },
    figureCaption: {
      pt: 'Mapa de salinidade do solo nas zonas de Cafine-Cafal (A), Elalab (B) e Enchugal (C) da Guiné-Bissau (D), África Ocidental.',
      en: 'Soil salinity map located in the Cafine-Cafal (A), Elalab (B), and Enchugal (C) of Guinea Bissau (D), West Africa.',
    },
    reference: 'Garbanzo, G., Céspedes, J., Temudo, M., Cameira, M.R, Paredes, P., & Ramos, T. (2025). Advances in soil salinity diagnosis for mangrove swamp rice production in Guinea Bissau, West Africa. Science of Remote Sensing, 11, 100231.',
    doi: null,
    images: [
      { src: soilSalinity, alt: 'Soil salinity maps A, B, C, D — Guinea Bissau' },
    ],
  },
  {
    id: 'irrigated-areas-mediterranean',
    title: {
      pt: 'Deteção e Mapeamento de Áreas Irrigadas — Ambiente Mediterrânico',
      en: 'Detecting and Mapping Irrigated Areas — Mediterranean Environment',
    },
    figureCaption: {
      pt: 'Deteção e mapeamento de áreas irrigadas em ambiente mediterrânico utilizando humidade do solo por deteção remota.',
      en: 'Detecting and mapping irrigated areas in a Mediterranean environment by using remote sensing soil moisture.',
    },
    reference: null,
    doi: null,
    images: [
      { src: irrigatedAreas, alt: 'Irrigated areas detection using remote sensing soil moisture — Mediterranean' },
    ],
  },
  // Adicionar próximas publicações aqui
]

// ── Publication row ───────────────────────────────────────────────────────────
function PublicationRow({ pub, lang, index, openId, onToggle }) {
  const open = openId === pub.id
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      style={{ borderBottom: '1px solid hsl(var(--border))' }}
    >
      {/* Header — always visible, click to toggle */}
      <button
        onClick={() => onToggle(pub.id)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
          background: open ? 'hsl(var(--secondary) / 0.5)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'hsl(var(--secondary) / 0.3)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            color: 'hsl(var(--muted-foreground) / 0.45)',
            letterSpacing: '0.1em',
            flexShrink: 0,
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.92rem',
            fontWeight: 600,
            color: 'hsl(var(--foreground))',
            letterSpacing: '-0.01em',
          }}>
            {pub.title[lang]}
          </span>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ flexShrink: 0, color: 'hsl(var(--muted-foreground) / 0.5)' }}
        >
          <ChevronDown size={15} strokeWidth={1.8} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1.5rem 2rem' }}>

              {/* Images */}
              {pub.images?.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: pub.images.length > 1 ? 'repeat(auto-fit, minmax(240px, 1fr))' : '1fr',
                  gap: '0.75rem',
                  marginBottom: '1.25rem',
                }}>
                  {pub.images.map((img, i) => (
                    <img
                      key={i}
                      src={img.src}
                      alt={img.alt ?? ''}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '4px',
                        border: '1px solid hsl(var(--border))',
                        display: 'block',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Figure caption */}
              {pub.figureCaption?.[lang] && (
                <p style={{
                  fontSize: '0.78rem',
                  color: 'hsl(var(--muted-foreground))',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                  marginBottom: '1.25rem',
                  maxWidth: '680px',
                }}>
                  {pub.figureCaption[lang]}
                </p>
              )}

              {/* Reference + DOI */}
              {(pub.reference || pub.doi) && <div style={{
                paddingTop: '1rem',
                borderTop: '1px solid hsl(var(--border) / 0.5)',
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.6rem',
              }}>
                <BookMarked
                  size={11}
                  strokeWidth={1.8}
                  style={{ color: 'hsl(var(--primary) / 0.6)', flexShrink: 0, marginTop: '2px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.62rem',
                    color: 'hsl(var(--muted-foreground) / 0.75)',
                    lineHeight: 1.7,
                    letterSpacing: '0.01em',
                  }}>
                    {pub.reference}
                  </p>
                  {pub.doi && (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.62rem',
                        color: 'hsl(var(--primary))',
                        textDecoration: 'none',
                        letterSpacing: '0.02em',
                        borderBottom: '1px solid hsl(var(--primary) / 0.3)',
                        paddingBottom: '1px',
                        alignSelf: 'flex-start',
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'hsl(var(--primary))'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.3)'}
                    >
                      {pub.doi}
                    </a>
                  )}
                </div>
              </div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Teledeteção() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'
  const [openId, setOpenId] = useState(null)
  const handleToggle = (id) => setOpenId(prev => prev === id ? null : id)

  const label    = lang === 'pt' ? 'Teledeteção' : 'Remote Sensing'
  const subtitle = lang === 'pt'
    ? 'Utilização de imagens de satélite e técnicas de deteção remota para monitorização e gestão de sistemas de rega.'
    : 'Use of satellite imagery and remote sensing techniques for irrigation monitoring and management.'
  const sectionTitle = lang === 'pt' ? 'Aplicações de Deteção Remota' : 'Remote Sensing Applications'

  return (
    <section
      className="section"
      style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden', flex: 1 }}
    >
      <GhostImage
        src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80"
        side="right"
        opacity={0.07}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number="" label={label} />

        <p style={{
          fontSize: '0.88rem',
          color: 'hsl(var(--muted-foreground))',
          lineHeight: 1.75,
          maxWidth: '640px',
          marginBottom: '3rem',
        }}>
          {subtitle}
        </p>

        {/* Applications section */}
        <div style={{ marginBottom: '0.75rem' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'hsl(var(--primary))',
          }}>
            {sectionTitle}
          </span>
        </div>

        <div style={{
          border: '1px solid hsl(var(--border))',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          {PUBLICATIONS.map((pub, i) => (
            <PublicationRow key={pub.id} pub={pub} lang={lang} index={i} openId={openId} onToggle={handleToggle} />
          ))}
        </div>
      </div>
    </section>
  )
}
