import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WaterCursor from '../components/WaterCursor'
import { SectionHeader } from '../components/About'
import GhostImage from '../components/GhostImage'

// ── Data ─────────────────────────────────────────────────────────────────────
const ALL_ITEMS = [
  // ── PhD ──────────────────────────────────────────────────────────────────
  {
    id: 'phd-0', type: 'phd', status: 'completed', year: 2025,
    yearLabel: '2021 – 2025',
    name: 'Gabriel Garbanzo',
    title: 'Let the brackish water enter the field: soil hydric-saline balance in mangrove rice production',
    program: 'Doutoramento em Uso Sustentável da Terra / Esp. Eng. Ambiente · ISA, ULisboa',
  },
  {
    id: 'phd-1', type: 'phd', status: 'completed', year: 2024,
    yearLabel: '2021 – 2024',
    name: 'João Guilherme Serra',
    title: 'Modelling the impact of different future scenarios of agricultural management practices: A multi-scenario approach with an emphasis on crop residues',
    program: 'Doutoramento em Engenharia do Ambiente · ISA, Universidade de Lisboa',
  },
  {
    id: 'phd-2', type: 'phd', status: 'ongoing',
    name: 'Beatriz Borges Vacas',
    title: 'Integrated Modelling of Irrigation Systems for Agroecological Transition: A Water–Energy–Food Nexus Approach',
    program: 'Doutoramento em Uso Sustentável da Terra / Esp. Eng. Agronómica · ISA, Universidade de Lisboa',
  },
  {
    id: 'phd-3', type: 'phd', status: 'ongoing',
    name: 'Antónia Duarte Ferreira',
    title: 'Climate change resilience of pressurized collective irrigation systems working on-demand in water-scarce regions',
    program: 'Doutoramento em Uso Sustentável da Terra / Esp. Eng. Agronómica · ISA, U Lisboa',
  },
  // ── MSc ──────────────────────────────────────────────────────────────────
  {
    id: 'msc-0', type: 'msc', status: 'completed', year: 2026,
    yearLabel: '2026',
    name: 'Mariana de Oliveira Bica',
    title: 'Desenvolvimento e avaliação de um sistema de monitorização para a zona não saturada do solo na Zona Vulnerável do Tejo',
    program: 'Mestrado em Eng. Agronómica, Eng. Rural',
  },
  {
    id: 'msc-1', type: 'msc', status: 'completed', year: 2025,
    yearLabel: '2025',
    name: 'Luís Catarino',
    title: 'Estimativa de consumos de água em regadios individuais com recurso a deteção remota',
    program: 'Mestrado em Eng. Agronómica, Eng. Rural · ISA. Âmbito do projeto Clepsydra',
  },
  {
    id: 'msc-2', type: 'msc', status: 'completed', year: 2023,
    yearLabel: '2023',
    name: 'Maria da Assunção Telles Moniz Corte-Real',
    title: 'Elaboração de um projeto de rega localizada para um amendoal intensivo no Alentejo',
    program: 'Mestrado em Eng. Agronómica, Eng. Rural · ISA. Âmbito do projeto PRIMA-HubIS',
  },
  {
    id: 'msc-3', type: 'msc', status: 'completed', year: 2023,
    yearLabel: '2023',
    name: 'Manuel Zeferino Leiria',
    title: 'Adoção de tecnologias emergentes de gestão da rega. Rega de precisão, rega inteligente e rega digital',
    program: 'Mestrado em Eng. Agronómica · ISA',
  },
  {
    id: 'msc-4', type: 'msc', status: 'completed', year: 2023,
    yearLabel: '2023',
    name: 'Pedro Miguel Landeira Cabral',
    title: 'Dimensionamento da rede de rega coletiva do Aproveitamento Hidroagrícola do Crato em cenário de alterações climáticas',
    program: "Mestrado em Eng. Agronómica, Eng. Rural · ISA. Em colaboração com Campo d'Água",
  },
  {
    id: 'msc-5', type: 'msc', status: 'completed', year: 2022,
    yearLabel: '2022',
    name: 'Artur Ricardo Afonso Costeira',
    title: 'Estudo Hidrológico da Bacia de Alenquer com recurso ao modelo SWAT',
    program: 'Mestrado em Eng. do Ambiente · ISA',
  },
  {
    id: 'msc-6', type: 'msc', status: 'completed', year: 2022,
    yearLabel: '2022',
    name: 'Rita Quintino Esteves',
    title: 'Impacto das alterações climáticas nas necessidades de rega — Avaliação da resiliência no Aproveitamento Hidroagrícola de Maiorga',
    program: 'Mestrado em Eng. Agronómica, Eng. Rural · ISA. Em colaboração com a COBA',
  },
  {
    id: 'msc-7', type: 'msc', status: 'ongoing',
    name: 'Catarina Amorim',
    title: 'Utilização de dados de previsão meteorológica sazonais para apoio à gestão da rega com água subterrânea',
    program: 'Mestrado em Eng. Agronómica, Esp. Eng. Rural',
  },
  {
    id: 'msc-8', type: 'msc', status: 'ongoing',
    name: 'Daniel Barnabé',
    title: 'Desenvolvimento, calibração e teste de sensores de humidade do solo de baixo custo',
    program: 'Mestrado em Eng. Agronómica · ISA',
  },
  {
    id: 'msc-9', type: 'msc', status: 'ongoing',
    name: 'Francisco Passanha',
    title: 'Impacto das alterações climáticas nas necessidades de rega, curvas características e custos de energia de uma rede de rega pressurizada',
    program: 'Mestrado em Eng. Agronómica, Esp. Eng. Rural · ISA. Em colaboração com Aqualogus',
  },
  {
    id: 'msc-10', type: 'msc', status: 'ongoing',
    name: 'Vasco Vieira Filipe',
    title: 'Projecto de um sistema de rega com bombagem alimentada por painéis solares off grid',
    program: 'Mestrado em Eng. Agronómica, Esp. Eng. Rural · ISA. Âmbito do projeto Clepsydra',
  },
  {
    id: 'msc-11', type: 'msc', status: 'ongoing',
    name: 'João Coimbra Ribeiro Telles',
    title: 'Relação precipitação-escoamento e a ocupação cultural da bacia do Maranhão no Aproveitamento Hidroagrícola do Vale do Sorraia',
    program: 'Mestrado em Eng. Agronómica · ISA. Em colaboração com a ARBVS',
  },
]

// ── Highlight matching text ───────────────────────────────────────────────────
function Highlight({ text, query }) {
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            style={{
              background: 'hsl(var(--primary) / 0.18)',
              color: 'inherit',
              borderRadius: '2px',
              padding: '0 1px',
            }}
          >
            {part}
          </mark>
        ) : part
      )}
    </>
  )
}

// ── Filter pill ───────────────────────────────────────────────────────────────
function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.22rem 0.75rem',
        borderRadius: '2px',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.62rem',
        letterSpacing: '0.06em',
        background: active ? 'hsl(var(--foreground))' : 'transparent',
        color: active ? 'hsl(var(--background))' : 'hsl(var(--muted-foreground))',
        transition: 'background 0.15s, color 0.15s',
      }}
    >
      {label}
    </button>
  )
}

// ── Repository row ────────────────────────────────────────────────────────────
function ThesisRow({ item, query, isExpanded, onToggle, index, ongoingLabel }) {
  const isOngoing = item.status === 'ongoing'
  const typeColor = item.type === 'phd' ? 'hsl(var(--primary))' : 'hsl(160 55% 42%)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      onClick={onToggle}
      style={{
        borderBottom: '1px solid hsl(var(--border))',
        padding: '1rem 1.25rem',
        cursor: 'pointer',
        background: isExpanded ? 'hsl(var(--secondary) / 0.5)' : 'hsl(var(--background))',
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = 'hsl(var(--secondary) / 0.3)' }}
      onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = 'hsl(var(--background))' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>

        {/* Left: pulse dot — only for ongoing */}
        {isOngoing && (
          <div style={{ paddingTop: '6px', flexShrink: 0 }}>
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: typeColor,
              }}
            />
          </div>
        )}

        {/* Center: content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Top row: name + badges */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'hsl(var(--foreground))',
              letterSpacing: '-0.01em',
            }}>
              <Highlight text={item.name} query={query} />
            </span>

            {/* Type badge */}
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: typeColor,
              border: `1px solid ${typeColor}`,
              borderRadius: '2px',
              padding: '1px 5px',
              opacity: 0.85,
            }}>
              {item.type === 'phd' ? 'PhD' : 'MSc'}
            </span>

            {/* Status badge */}
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.08em',
              color: isOngoing ? typeColor : 'hsl(var(--muted-foreground) / 0.6)',
              opacity: 0.9,
            }}>
              {isOngoing ? ongoingLabel : item.yearLabel}
            </span>
          </div>

          {/* Title */}
          <p style={{
            fontSize: '0.82rem',
            color: 'hsl(var(--muted-foreground))',
            fontStyle: 'italic',
            lineHeight: 1.5,
            overflow: isExpanded ? 'visible' : 'hidden',
            textOverflow: isExpanded ? 'unset' : 'ellipsis',
            whiteSpace: isExpanded ? 'normal' : 'nowrap',
            marginBottom: isExpanded ? '0.5rem' : 0,
          }}>
            <Highlight text={item.title} query={query} />
          </p>

          {/* Program — only when expanded */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.p
                key="program"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '0.25rem' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontSize: '0.75rem',
                  color: 'hsl(var(--muted-foreground) / 0.75)',
                  lineHeight: 1.5,
                  overflow: 'hidden',
                }}
              >
                <Highlight text={item.program} query={query} />
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Right: chevron */}
        <div style={{
          flexShrink: 0,
          color: 'hsl(var(--muted-foreground) / 0.4)',
          paddingTop: '2px',
          transition: 'transform 0.2s',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <ChevronDown size={14} />
        </div>
      </div>
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DissertacoesPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'

  const [query, setQuery]               = useState('')
  const [typeFilter, setTypeFilter]     = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expanded, setExpanded]         = useState(null)

  const label    = lang === 'pt' ? 'Dissertações e Teses' : 'Dissertations & Theses'
  const subtitle = lang === 'pt'
    ? 'Apoiadas pelo Laboratório Digital + FabLab'
    : 'Supported by the Digital Laboratory + FabLab'

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return ALL_ITEMS.filter(item => {
      if (typeFilter !== 'all' && item.type !== typeFilter) return false
      if (statusFilter !== 'all' && item.status !== statusFilter) return false
      if (q) {
        return (
          item.name.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.program.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [query, typeFilter, statusFilter])

  // Sort: ongoing first, then completed by year desc
  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    if (a.status === b.status) return (b.year ?? 9999) - (a.year ?? 9999)
    return a.status === 'ongoing' ? -1 : 1
  }), [filtered])

  const handleToggle = (id) => setExpanded(prev => prev === id ? null : id)
  const clearQuery = () => { setQuery(''); setExpanded(null) }

  const ui = {
    pt: {
      searchPlaceholder: 'Pesquisar por nome, título ou programa…',
      all: 'Todos',
      ongoing: 'Em curso',
      completed: 'Terminadas',
      results: (n) => `${n} ${n === 1 ? 'resultado' : 'resultados'}`,
      resultsFor: (n, q) => `${n} ${n === 1 ? 'resultado' : 'resultados'} para "${q}"`,
      noResults: (q) => `Nenhum resultado para "${q}"`,
    },
    en: {
      searchPlaceholder: 'Search by name, title or programme…',
      all: 'All',
      ongoing: 'Ongoing',
      completed: 'Completed',
      results: (n) => `${n} ${n === 1 ? 'result' : 'results'}`,
      resultsFor: (n, q) => `${n} ${n === 1 ? 'result' : 'results'} for "${q}"`,
      noResults: (q) => `No results for "${q}"`,
    },
  }[lang]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WaterCursor />
      <Navbar subpage />
      <main style={{ paddingTop: '72px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <section
          className="section"
          style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden', flex: 1 }}
        >
          <GhostImage
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80"
            side="right"
            opacity={0.1}
          />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <SectionHeader number="" label={label} />

            {/* Subtitle */}
            <p style={{
              fontSize: '0.78rem',
              color: 'hsl(var(--muted-foreground))',
              marginBottom: '2rem',
            }}>
              {subtitle}
            </p>

            {/* Search + filters row */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem', alignItems: 'center' }}>

              {/* Search bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flex: 1,
                minWidth: 220,
                border: '1px solid hsl(var(--border))',
                borderRadius: '4px',
                padding: '0.4rem 0.75rem',
                background: 'hsl(var(--background))',
                transition: 'border-color 0.2s',
              }}
                onFocusCapture={e => e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.6)'}
                onBlurCapture={e => e.currentTarget.style.borderColor = 'hsl(var(--border))'}
              >
                <Search size={13} color="hsl(var(--muted-foreground))" strokeWidth={1.8} style={{ flexShrink: 0 }} />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={ui.searchPlaceholder}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                {query && (
                  <button
                    onClick={clearQuery}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: 'hsl(var(--muted-foreground))' }}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Type filter */}
              <div style={{ display: 'flex', gap: '2px', background: 'hsl(var(--border))', borderRadius: '4px', padding: '2px', flexShrink: 0 }}>
                {[
                  { key: 'all', label: ui.all },
                  { key: 'phd', label: 'PhD' },
                  { key: 'msc', label: 'MSc' },
                ].map(f => (
                  <FilterPill key={f.key} label={f.label} active={typeFilter === f.key} onClick={() => setTypeFilter(f.key)} />
                ))}
              </div>

              {/* Status filter */}
              <div style={{ display: 'flex', gap: '2px', background: 'hsl(var(--border))', borderRadius: '4px', padding: '2px', flexShrink: 0 }}>
                {[
                  { key: 'all',       label: ui.all },
                  { key: 'ongoing',   label: ui.ongoing },
                  { key: 'completed', label: ui.completed },
                ].map(f => (
                  <FilterPill key={f.key} label={f.label} active={statusFilter === f.key} onClick={() => setStatusFilter(f.key)} />
                ))}
              </div>
            </div>

            {/* Results count */}
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                color: 'hsl(var(--muted-foreground) / 0.6)',
                letterSpacing: '0.05em',
              }}>
                {query ? ui.resultsFor(sorted.length, query) : ui.results(sorted.length)}
              </span>
            </div>

            {/* Repository list */}
            <motion.div
              layout
              style={{
                border: '1px solid hsl(var(--border))',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <AnimatePresence mode="popLayout">
                {sorted.length > 0 ? (
                  sorted.map((item, i) => (
                    <ThesisRow
                      key={item.id}
                      item={item}
                      query={query}
                      isExpanded={expanded === item.id}
                      onToggle={() => handleToggle(item.id)}
                      index={i}
                      ongoingLabel={ui.ongoing}
                    />
                  ))
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      padding: '3rem 2rem',
                      textAlign: 'center',
                      color: 'hsl(var(--muted-foreground) / 0.6)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.75rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {ui.noResults(query)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
