import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, FlaskConical, Waves, Wrench, Briefcase, Landmark } from 'lucide-react'
import { SectionHeader } from './About'

const PARTNERS = [
  {
    id: 'utad',
    group: 'universidades',
    icon: GraduationCap,
    name: { pt: 'UTAD', en: 'UTAD' },
    href: 'https://www.utad.pt/',
  },
  {
    id: 'montpellier',
    group: 'universidades',
    icon: GraduationCap,
    name: { pt: 'Institut Agro Montpellier | France', en: 'Institut Agro Montpellier | France' },
    href: 'https://www.institut-agro-montpellier.fr/',
  },
  {
    id: 'wageningen',
    group: 'universidades',
    icon: GraduationCap,
    name: { pt: 'Wageningen University', en: 'Wageningen University' },
    href: 'https://www.wur.nl/',
  },
  {
    id: 'aarhus',
    group: 'universidades',
    icon: GraduationCap,
    name: { pt: 'Aarhus University', en: 'Aarhus University' },
    href: 'https://www.au.dk/',
  },
  {
    id: 'athens',
    group: 'universidades',
    icon: GraduationCap,
    name: { pt: 'Agricultural University of Athens', en: 'Agricultural University of Athens' },
    href: 'https://www2.aua.gr/en',
  },
  {
    id: 'iniav',
    group: 'centros',
    icon: FlaskConical,
    name: { pt: 'INIAV', en: 'INIAV' },
    href: 'https://www.iniav.pt/',
  },
  {
    id: 'sorraia',
    group: 'associacoes',
    icon: Waves,
    name: {
      pt: 'Associação de Regantes e Beneficiários do Vale do Sorraia',
      en: 'Sorraia Valley Irrigators and Beneficiaries Association',
    },
    href: 'https://www.arbvs.pt/index.php',
  },
  {
    id: 'lucefecit',
    group: 'associacoes',
    icon: Waves,
    name: {
      pt: 'Associação de Beneficiários do Lucefecit',
      en: 'Lucefecit Beneficiaries Association',
    },
  },
  {
    id: 'mira',
    group: 'associacoes',
    icon: Waves,
    name: {
      pt: 'Associação de Regantes e Beneficiários do Mira',
      en: 'Mira Irrigators and Beneficiaries Association',
    },
  },
  {
    id: 'minutos',
    group: 'associacoes',
    icon: Waves,
    name: {
      pt: 'Associação de Beneficiários da Barragem dos Minutos',
      en: 'Barragem dos Minutos Beneficiaries Association',
    },
  },
  {
    id: 'caia',
    group: 'associacoes',
    icon: Waves,
    name: {
      pt: 'Associação de Beneficiários do Caia',
      en: 'Caia Beneficiaries Association',
    },
  },
  {
    id: 'aquagri',
    group: 'equipamento',
    icon: Wrench,
    name: { pt: 'Aquagri', en: 'Aquagri' },
  },
  {
    id: 'hubel',
    group: 'equipamento',
    icon: Wrench,
    name: { pt: 'Hubel Verde', en: 'Hubel Verde' },
  },
  {
    id: 'rainbird',
    group: 'equipamento',
    icon: Wrench,
    name: { pt: 'Rain Bird', en: 'Rain Bird' },
  },
  {
    id: 'aqualogus',
    group: 'consultoria',
    icon: Briefcase,
    name: { pt: 'AQUALOGUS', en: 'AQUALOGUS' },
  },
  {
    id: 'campo-dagua',
    group: 'consultoria',
    icon: Briefcase,
    name: { pt: "Campo d'Água - Engenharia e Gestão", en: "Campo d'Água - Engineering and Management" },
  },
  {
    id: 'coba',
    group: 'consultoria',
    icon: Briefcase,
    name: { pt: 'COBA Group', en: 'COBA Group' },
  },
  {
    id: 'tpf',
    group: 'consultoria',
    icon: Briefcase,
    name: { pt: 'TPF Consultores', en: 'TPF Consultores' },
  },
  {
    id: 'dgadr',
    group: 'publicas',
    icon: Landmark,
    name: {
      pt: 'DGADR — Direção-Geral de Agricultura e Desenvolvimento Rural',
      en: 'DGADR — Directorate-General for Agriculture and Rural Development',
    },
  },
  {
    id: 'apa',
    group: 'publicas',
    icon: Landmark,
    name: { pt: 'Agência Portuguesa do Ambiente', en: 'Portuguese Environment Agency' },
  },
  {
    id: 'cotr',
    group: 'publicas',
    icon: Landmark,
    name: { pt: 'COTR', en: 'COTR' },
  },
  {
    id: 'aprh',
    group: 'publicas',
    icon: Landmark,
    name: { pt: 'APRH', en: 'APRH' },
  },
  {
    id: 'oe',
    group: 'publicas',
    icon: Landmark,
    name: { pt: 'Ordem dos Engenheiros', en: 'Portuguese Order of Engineers' },
  },
]

const FILTERS = [
  { id: 'all',            pt: 'Todos',                            en: 'All' },
  { id: 'universidades',  pt: 'Universidades',                    en: 'Universities' },
  { id: 'centros',        pt: 'Centros de Investigação',          en: 'Research Centres' },
  { id: 'associacoes',    pt: 'Associações de Regantes',          en: 'Irrigation Associations' },
  { id: 'equipamento',    pt: 'Empresas de equipamento',          en: 'Equipment companies' },
  { id: 'consultoria',    pt: 'Empresas de consultoria',          en: 'Consultancy companies' },
  { id: 'publicas',       pt: 'Entidades Públicas',               en: 'Public Entities' },
]

function PartnerBalloon({ partner, lang, index, inView }) {
  const Icon = partner.icon
  const hasLink = Boolean(partner.href)
  const open = () => {
    if (partner.href) window.open(partner.href, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.08 + index * 0.03 }}
      onClick={open}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.9rem',
        width: '100%',
        textAlign: 'left',
        padding: '1.15rem 1.25rem',
        background: 'hsl(var(--background))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '999px',
        cursor: hasLink ? 'pointer' : 'default',
        transition: 'border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.45)'
        e.currentTarget.style.background = 'hsl(var(--primary) / 0.06)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 20px hsl(var(--foreground) / 0.06)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'hsl(var(--border))'
        e.currentTarget.style.background = 'hsl(var(--background))'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <span style={{
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: 'hsl(var(--primary) / 0.1)',
        border: '1px solid hsl(var(--primary) / 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'hsl(var(--primary))',
        flexShrink: 0,
      }}>
        <Icon size={16} strokeWidth={1.6} />
      </span>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.88rem',
        fontWeight: 600,
        color: 'hsl(var(--foreground))',
        letterSpacing: '-0.01em',
        lineHeight: 1.35,
      }}>
        {partner.name[lang]}
      </span>
    </motion.button>
  )
}

export default function Partners() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [filter, setFilter] = useState('all')
  const visible = PARTNERS.filter(p => filter === 'all' || p.group === filter)

  return (
    <section id="parcerias" className="section" ref={ref} style={{ borderTop: '1px solid hsl(var(--border))' }}>
      <div className="container">
        <SectionHeader number="05" label={t('partners.label')} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.25rem', maxWidth: '640px' }}
        >
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'hsl(var(--foreground))',
            marginBottom: '0.75rem',
          }}>
            {t('partners.title')}
          </h2>
          <p style={{
            fontSize: '0.9rem',
            color: 'hsl(var(--muted-foreground))',
            lineHeight: 1.7,
          }}>
            {t('partners.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          {FILTERS.map((item) => {
            const active = filter === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  color: active ? 'hsl(var(--background))' : 'hsl(var(--muted-foreground))',
                  background: active ? 'hsl(var(--foreground))' : 'hsl(var(--secondary))',
                  border: `1px solid ${active ? 'hsl(var(--foreground))' : 'hsl(var(--border))'}`,
                  padding: '0.4rem 0.95rem',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                }}
              >
                {item[lang]}
              </button>
            )
          })}
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '0.75rem',
        }}>
          {visible.map((partner, i) => (
            <PartnerBalloon
              key={partner.id}
              partner={partner}
              lang={lang}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
