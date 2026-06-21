import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import { ChevronDown, BookMarked } from 'lucide-react'
import GhostImage from './GhostImage'
import { SectionHeader } from './About'

import participatoryModelling from '../assets/images/modeling/participatory-modelling-hydraulic.jpg'
import nitrogenMaps         from '../assets/images/modeling/nitrogen-groundwater-surface-portugal.png'
import groundwaterForecast  from '../assets/images/modeling/groundwater-forecasting-arx-xgboost.jpg'

// ── Data ──────────────────────────────────────────────────────────────────────
const PUBLICATIONS = [
  {
    id: 'participatory-modelling-hydraulic',
    title: {
      pt: 'Modelação Participativa para Fiabilidade Hidráulica e Eficiência Energética',
      en: 'Participatory Modelling for Hydraulic Reliability and Energy Efficiency',
    },
    figureCaption: {
      pt: 'Abordagem de modelação participativa para o desenvolvimento de ferramentas de apoio a sistemas de rega coletiva, integrando aquisição de informação, monitorização e cenários futuros.',
      en: 'Participatory modelling approach for tool development in collective irrigation systems, integrating information acquisition, monitoring and future scenarios.',
    },
    reference: 'Cameira, M.R, Ferreira, A., Boteta, L., Fortes, P. S., & Calejo, M. J. (2025). Present and future challenges for hydraulic reliability and energy efficiency in collective irrigation systems: A participatory modelling approach. Agricultural Water Management, 309, 109355.',
    doi: 'https://doi.org/10.1016/j.agwat.2025.109355',
    images: [
      { src: participatoryModelling, alt: 'Participatory modelling framework for collective irrigation systems' },
    ],
  },
  {
    id: 'smart-agro-modelling-maize',
    title: {
      pt: 'Framework de Agromodelação Inteligente para Avaliação do Crescimento e Produção de Milho',
      en: 'Smart Agro-Modelling Framework for Maize Growth and Yield Assessment',
    },
    figureCaption: {
      pt: 'Framework integrando identificação de estádios de crescimento por NDVI, coeficientes culturais basais derivados de NDVI e estimativa do rendimento potencial em clima mediterrânico.',
      en: 'Framework integrating NDVI-based identification of growth stages, NDVI-derived basal crop coefficients and potential yield estimation in a Mediterranean climate.',
    },
    reference: 'Silva, S., Ferrazza, C. M., Rolim, J., Cameira, M. D. R., & Paredes, P. (2026). A Smart Agro-Modelling Framework for Maize Growth and Yield Assessment in a Mediterranean Climate. Water, 18(9), 1015.',
    doi: 'https://doi.org/10.3390/w18091015',
    images: [],
  },
  {
    id: 'nitrogen-irrigation-water',
    title: {
      pt: 'A Água de Rega como Fonte de Azoto na Agricultura',
      en: 'Irrigation Water as an Overlooked Source of Nitrogen in Agriculture',
    },
    figureCaption: {
      pt: 'Concentração média de NO₃⁻ nas águas subterrâneas e superficiais no período 1995–2019 a 500×500 m.',
      en: 'Average NO₃⁻ concentration in ground- and surface water for the period 1995–2019 at 500×500 m.',
    },
    reference: 'Serra, J., Paredes, P., Cordovil, C., Cruz, S., Hutchings, N. J., & Cameira, M. R. (2023). Is irrigation water an overlooked source of nitrogen in agriculture?. Agricultural Water Management, 278, 108147.',
    doi: 'https://doi.org/10.1016/j.agwat.2023.108147',
    images: [
      { src: nitrogenMaps, alt: 'NO3 concentration maps — groundwater and surface water Portugal 1995-2019' },
    ],
  },
  {
    id: 'groundwater-forecasting-arx-xgboost',
    title: {
      pt: 'Previsão do Nível Freático com Framework ARX-XGBoost',
      en: 'Groundwater Depth Forecasting Using ARX-XGBoost Framework',
    },
    figureCaption: {
      pt: 'Framework ARX-XGBoost para previsão do nível freático na Zona Vulnerável do Tejo, integrando dados hidrometeorológicos e validação cruzada com origem rolante.',
      en: 'ARX-XGBoost framework for groundwater depth forecasting in the Tagus Vulnerable Zone, integrating hydroclimatic drivers and rolling-origin cross-validation.',
    },
    reference: 'Pinto, D., Campagnolo, M., Martins, M.J., Cameira, M.R. (2026). Groundwater Depth Forecasting in the Tagus Vulnerable Zone Using an ARX–XGBoost Framework. Journal of Hydrology.',
    doi: null,
    images: [
      { src: groundwaterForecast, alt: 'ARX-XGBoost groundwater depth forecasting framework and results' },
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
      {/* Header */}
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
              {(pub.reference || pub.doi) && (
                <div style={{
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
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Modelação() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'
  const [openId, setOpenId] = useState(null)
  const handleToggle = (id) => setOpenId(prev => prev === id ? null : id)

  const label    = lang === 'pt' ? 'Modelação e Apoio à Decisão' : 'Modelling & Decision Support'
  const subtitle = lang === 'pt'
    ? 'Ferramentas digitais para modelação hidrológica, agrícola e de suporte à decisão em sistemas de rega.'
    : 'Digital tools for hydrological and agricultural modelling and decision support in irrigation systems.'
  const sectionTitle = lang === 'pt' ? 'Aplicações de Modelação e Apoio à Decisão' : 'Modelling & Decision Support Applications'

  return (
    <section
      className="section"
      style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden', flex: 1 }}
    >
      <GhostImage
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80"
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
