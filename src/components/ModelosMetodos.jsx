import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, BookOpen, Sun, LineChart, Waves, ChevronDown,
  Cpu, Network, Map, Globe, CloudSun, Satellite, Database, Leaf, Droplets, Box,
} from 'lucide-react'
import { SectionHeader } from './About'
import GhostImage from './GhostImage'

const PROTO_IMAGES = import.meta.glob(
  '../assets/images/modelos-metodos/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
)

function protoImage(file) {
  const exts = ['jpg', 'jpeg', 'png', 'webp']
  for (const ext of exts) {
    const src = PROTO_IMAGES[`../assets/images/modelos-metodos/${file}.${ext}`]
    if (src) return src
  }
  return null
}

const SHEETS = [
  {
    icon: Sun,
    href: 'https://docs.google.com/spreadsheets/d/1LEPuyyIz31-mWZx2OYhKTpqwTFSg50Dx/edit?usp=sharing&ouid=117521321304990263246&rtpof=true&sd=true',
    title: {
      pt: 'Evapotranspiração de referência',
      en: 'Reference evapotranspiration',
    },
    desc: {
      pt: 'Cálculo da evapotranspiração de referência, recorrendo aos métodos de Penman-Monteith e de Hargreaves-Samani.',
      en: 'Calculation of reference evapotranspiration using the Penman-Monteith and Hargreaves-Samani methods.',
    },
  },
  {
    icon: LineChart,
    href: 'https://docs.google.com/spreadsheets/d/182JWJZzBP9BNOoH1lY1AQ0Dn32hixjZV/edit?usp=sharing&ouid=117521321304990263246&rtpof=true&sd=true',
    title: {
      pt: 'Séries climatológicas e hidrológicas',
      en: 'Climatological and hydrological series',
    },
    desc: {
      pt: 'Tratamento e análise de séries climatológicas e hidrológicas.',
      en: 'Processing and analysis of climatological and hydrological series.',
    },
  },
  {
    icon: Waves,
    href: 'https://docs.google.com/spreadsheets/d/1KHmE4rA9o5Kf6E1b1d0atSmmtXeWBewT/edit?usp=sharing&ouid=117521321304990263246&rtpof=true&sd=true',
    title: {
      pt: 'Cálculos hidráulicos em canais',
      en: 'Hydraulic calculations in canals',
    },
    desc: {
      pt: 'Cálculos hidráulicos em canais.',
      en: 'Hydraulic calculations in canals.',
    },
  },
]

const PROTOTYPES = [
  {
    icon: Box,
    imageFile: 'prototipo-pedagogico',
    title: {
      pt: 'Protótipo pedagógico de um sistema de rega automatizado',
      en: 'Pedagogical prototype of an automated irrigation system',
    },
    desc: {
      pt: 'Protótipo usado em contexto de ensino para demonstrar a automação da rega.',
      en: 'Prototype used in a teaching context to demonstrate irrigation automation.',
    },
  },
]

const SOFTWARE = [
  {
    icon: Cpu,
    href: 'http://home.isa.utl.pt/~jlteixeira/index.htm',
    title: { pt: 'ISAREG', en: 'ISAREG' },
    desc: {
      pt: 'Software desenvolvido no Instituto Superior de Agronomia da Universidade de Lisboa para simular o balanço hídrico do solo com rega. Permite calcular as necessidades de rega das culturas com base em variáveis meteorológicas e características do solo e da cultura, produzindo resultados gráficos para apoio à interpretação do balanço hídrico.',
      en: 'Software developed at the Instituto Superior de Agronomia, University of Lisbon, to simulate soil water balance with irrigation. It calculates crop irrigation requirements from meteorological variables and soil and crop characteristics, producing graphical results to support water-balance interpretation.',
    },
  },
  {
    icon: Network,
    href: 'https://www.epa.gov/water-research/epanet',
    title: { pt: 'EPANET', en: 'EPANET' },
    desc: {
      pt: 'Software amplamente utilizado para simular sistemas de distribuição de água em pressão. Disponibiliza uma interface gráfica para construir e analisar redes, simulando o comportamento hidráulico e, quando aplicável, a qualidade da água. Desenvolvido pela United States Environmental Protection Agency.',
      en: 'Widely used software for simulating pressurised water distribution systems. It provides a graphical interface to build and analyse networks, simulating hydraulic behaviour and, where applicable, water quality. Developed by the United States Environmental Protection Agency.',
    },
  },
  {
    icon: Map,
    href: 'https://sigopram.es/',
    title: { pt: 'SIGOPRAM', en: 'SIGOPRAM' },
    desc: {
      pt: 'Software que permite executar o modelo hidráulico EPANET em ambiente SIG. Desenvolvido pela empresa espanhola Aigües del Segarra Garrigues, S.A. (ASG). Uma versão educativa é usada em unidades curriculares para iniciar os estudantes na simulação hidráulica de redes de distribuição de água em pressão para rega.',
      en: 'Software that runs the EPANET hydraulic model in a GIS environment. Developed by the Spanish company Aigües del Segarra Garrigues, S.A. (ASG). An educational version is used in curricular units to introduce students to hydraulic simulation of pressurised irrigation water-distribution networks.',
    },
  },
]

const PLATFORMS = [
  {
    icon: Globe,
    href: 'https://earthengine.google.com/',
    title: { pt: 'Google Earth Engine (GEE)', en: 'Google Earth Engine (GEE)' },
    desc: {
      pt: 'Plataforma de análise geoespacial em ambiente de computação na nuvem, que permite processar grandes volumes de dados de deteção remota e informação geográfica. Inclui acesso a dados de satélite, como Landsat, Sentinel e MODIS, bem como a conjuntos de dados climáticos, topográficos, hidrológicos e de uso do solo.',
      en: 'Geospatial analysis platform in a cloud computing environment, used to process large volumes of remote-sensing and geographic data. It includes access to satellite data such as Landsat, Sentinel and MODIS, as well as climate, topographic, hydrological and land-use datasets.',
    },
  },
  {
    icon: CloudSun,
    href: 'https://climate.copernicus.eu/climate-data-store',
    title: { pt: 'Copernicus Climate Data Store', en: 'Copernicus Climate Data Store' },
    desc: {
      pt: 'Acesso a dados climáticos históricos, reanálises e projeções climáticas para exercícios de hidrologia, necessidades de rega e alterações climáticas.',
      en: 'Access to historical climate data, reanalyses and climate projections for hydrology, irrigation-requirement and climate-change exercises.',
    },
  },
  {
    icon: Satellite,
    href: 'https://www.esa.int/Education/Copernicus_Browser_guide',
    title: { pt: 'Copernicus Browser', en: 'Copernicus Browser' },
    desc: {
      pt: 'Visualização e análise de imagens Sentinel, cálculo de índices de vegetação, observação de culturas, solo e água.',
      en: 'Visualisation and analysis of Sentinel imagery, vegetation-index calculation, and observation of crops, soil and water.',
    },
  },
  {
    icon: Database,
    href: 'https://science.nasa.gov/learn/entry-points-to-nasa-data/',
    title: { pt: 'NASA Earthdata', en: 'NASA Earthdata' },
    desc: {
      pt: 'Acesso a dados de satélite e produtos ambientais para exercícios de clima, água, vegetação, precipitação e observação da Terra; inclui ferramentas como Giovanni.',
      en: 'Access to satellite data and environmental products for climate, water, vegetation, precipitation and Earth-observation exercises; includes tools such as Giovanni.',
    },
  },
  {
    icon: Leaf,
    href: 'https://data.apps.fao.org/wapor/',
    title: { pt: 'FAO WaPOR', en: 'FAO WaPOR' },
    desc: {
      pt: 'Monitorização da produtividade da água com dados de deteção remota, útil para rega, evapotranspiração, produtividade da água e análise de sistemas agrícolas.',
      en: 'Water-productivity monitoring with remote-sensing data, useful for irrigation, evapotranspiration, water productivity and analysis of agricultural systems.',
    },
  },
  {
    icon: Droplets,
    href: 'https://etdata.org/api',
    title: { pt: 'OpenET', en: 'OpenET' },
    desc: {
      pt: 'Acesso a dados de evapotranspiração obtidos por satélite, útil para demonstrar aplicações em gestão da água, rega e balanço hídrico. O serviço indica acesso gratuito à API, sujeito a quotas.',
      en: 'Access to satellite-derived evapotranspiration data, useful for demonstrating applications in water management, irrigation and water balance. The service offers free API access, subject to quotas.',
    },
  },
]

function ResourceCard({ item, lang, inView, delay }) {
  const Icon = item.icon
  const hasLink = Boolean(item.href)
  const open = () => {
    if (item.href) window.open(item.href, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
      onClick={open}
      style={{
        background: 'hsl(var(--background))',
        padding: '1.5rem 1.4rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: hasLink ? 'pointer' : 'default',
        transition: 'background 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'hsl(var(--secondary) / 0.5)'
        const cta = e.currentTarget.querySelector('.resource-cta')
        if (cta) cta.style.opacity = '1'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'hsl(var(--background))'
        const cta = e.currentTarget.querySelector('.resource-cta')
        if (cta) cta.style.opacity = '0'
      }}
    >
      <Icon size={18} strokeWidth={1.5} color="hsl(var(--primary))" style={{ marginBottom: '1rem' }} />
      <h3 style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.95rem',
        fontWeight: 600,
        color: 'hsl(var(--foreground))',
        letterSpacing: '-0.01em',
        lineHeight: 1.35,
        margin: '0 0 0.55rem',
      }}>
        {item.title[lang]}
      </h3>
      <p style={{
        fontSize: '0.8rem',
        color: 'hsl(var(--muted-foreground))',
        lineHeight: 1.65,
        margin: 0,
        flex: 1,
      }}>
        {item.desc[lang]}
      </p>
      {hasLink && (
        <span
          className="resource-cta"
          style={{
            marginTop: '1rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'hsl(var(--primary))',
            opacity: 0,
            transition: 'opacity 0.25s ease',
          }}
        >
          {lang === 'pt' ? 'Abrir' : 'Open'} ↗
        </span>
      )}
    </motion.div>
  )
}

function PrototypeCard({ item, lang, inView }) {
  const Icon = item.icon
  const [open, setOpen] = useState(false)
  const imageSrc = item.imageFile ? protoImage(item.imageFile) : null
  const expandable = Boolean(imageSrc)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45 }}
      style={{
        background: 'hsl(var(--background))',
        border: `1px solid ${open ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--border))'}`,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <button
        type="button"
        onClick={() => expandable && setOpen(prev => !prev)}
        aria-expanded={open}
        style={{
          width: '100%',
          background: open ? 'hsl(var(--secondary) / 0.45)' : 'hsl(var(--background))',
          padding: '1.5rem 1.4rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          border: 'none',
          cursor: expandable ? 'pointer' : 'default',
          textAlign: 'left',
          transition: 'background 0.25s ease',
        }}
        onMouseEnter={e => {
          if (expandable && !open) e.currentTarget.style.background = 'hsl(var(--secondary) / 0.5)'
        }}
        onMouseLeave={e => {
          if (!open) e.currentTarget.style.background = 'hsl(var(--background))'
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <Icon size={18} strokeWidth={1.5} color="hsl(var(--primary))" style={{ marginBottom: '1rem' }} />
          <h3 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'hsl(var(--foreground))',
            letterSpacing: '-0.01em',
            lineHeight: 1.35,
            margin: '0 0 0.55rem',
          }}>
            {item.title[lang]}
          </h3>
          <p style={{
            fontSize: '0.8rem',
            color: 'hsl(var(--muted-foreground))',
            lineHeight: 1.65,
            margin: 0,
          }}>
            {item.desc[lang]}
          </p>
          {expandable && (
            <span style={{
              display: 'inline-block',
              marginTop: '1rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'hsl(var(--primary))',
            }}>
              {open
                ? (lang === 'pt' ? 'Fechar' : 'Close')
                : (lang === 'pt' ? 'Ver imagem' : 'View image')}
            </span>
          )}
        </div>
        {expandable && (
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ flexShrink: 0, color: 'hsl(var(--muted-foreground) / 0.55)', marginTop: '0.15rem' }}
          >
            <ChevronDown size={16} strokeWidth={1.8} />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && imageSrc && (
          <motion.div
            key="proto-image"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 1.4rem 1.5rem',
              borderTop: '1px solid hsl(var(--border) / 0.6)',
              paddingTop: '1.25rem',
            }}>
              <img
                src={imageSrc}
                alt={item.title[lang]}
                style={{
                  width: '100%',
                  maxHeight: '72vh',
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: '4px',
                  border: '1px solid hsl(var(--border))',
                  background: 'hsl(var(--secondary) / 0.35)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ResourceGrid({ items, lang, inView }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '1px',
      background: 'hsl(var(--border) / 0.5)',
      border: '1px solid hsl(var(--border))',
      borderRadius: '4px',
      overflow: 'hidden',
    }}>
      {items.map((item, i) => (
        <ResourceCard
          key={item.title.pt}
          item={item}
          lang={lang}
          inView={inView}
          delay={i * 0.06}
        />
      ))}
    </div>
  )
}

function SectionTitle({ children, note }) {
  return (
    <div style={{ marginBottom: '1.15rem' }}>
      <h3 style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.05rem',
        fontWeight: 600,
        color: 'hsl(var(--foreground))',
        letterSpacing: '-0.01em',
        margin: 0,
      }}>
        {children}
      </h3>
      {note}
    </div>
  )
}

export default function ModelosMetodos() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'
  const navigate = useNavigate()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const label = lang === 'pt' ? 'Ensino' : 'Teaching'
  const back = lang === 'pt' ? 'Voltar à página inicial' : 'Back to home'
  const title = lang === 'pt' ? 'Modelos e métodos' : 'Models and methods'

  return (
    <section
      className="section"
      ref={ref}
      style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden', flex: 1 }}
    >
      <GhostImage
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80"
        side="right"
        opacity={0.14}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader number="" label={label} />

        <a
          href="#/"
          onClick={(e) => { e.preventDefault(); navigate('/') }}
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
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.75rem' }}
        >
          <BookOpen size={22} strokeWidth={1.6} style={{ color: 'hsl(var(--primary))' }} />
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div>
            <SectionTitle>
              {lang === 'pt' ? 'Folhas de cálculo' : 'Spreadsheets'}
            </SectionTitle>
            <ResourceGrid items={SHEETS} lang={lang} inView={inView} />
          </div>

          <div>
            <SectionTitle>
              {lang === 'pt' ? 'Protótipos' : 'Prototypes'}
            </SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {PROTOTYPES.map((item) => (
                <PrototypeCard
                  key={item.title.pt}
                  item={item}
                  lang={lang}
                  inView={inView}
                />
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>
              {lang === 'pt' ? 'Ferramentas computacionais' : 'Computational tools'}
            </SectionTitle>
            <ResourceGrid items={SOFTWARE} lang={lang} inView={inView} />
          </div>

          <div>
            <SectionTitle>
              {lang === 'pt' ? 'Plataformas globais de acesso gratuito' : 'Global free-access platforms'}
            </SectionTitle>
            <ResourceGrid items={PLATFORMS} lang={lang} inView={inView} />
          </div>
        </div>
      </div>
    </section>
  )
}
