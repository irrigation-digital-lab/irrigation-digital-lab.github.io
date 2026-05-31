import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Bot, Leaf, Waves, Droplets } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WaterCursor from '../components/WaterCursor'
import { SectionHeader } from '../components/About'
import GhostImage from '../components/GhostImage'

const disciplines = [
  {
    icon: Bot,
    pt: {
      title: 'Sistemas Inteligentes e Robótica',
      desc: 'UC do 1º ciclo dos cursos de engenharia do ISA',
      tag: '1º Ciclo',
    },
    en: {
      title: 'Intelligent Systems and Robotics',
      desc: '1st cycle course of ISA engineering programmes',
      tag: '1st Cycle',
    },
  },
  {
    icon: Leaf,
    pt: {
      title: 'Agricultura Digital',
      desc: 'UC obrigatória do 2º ciclo de Engenharia Agronómica',
      tag: '2º Ciclo',
    },
    en: {
      title: 'Digital Agriculture',
      desc: 'Compulsory course of the 2nd cycle of Agronomic Engineering',
      tag: '2nd Cycle',
    },
  },
  {
    icon: Waves,
    pt: {
      title: 'Projetos Hidroagrícolas',
      desc: 'UC do 2º ciclo de Engenharia Agronómica, obrigatória para a especialização em Engenharia Rural',
      tag: '2º Ciclo',
    },
    en: {
      title: 'Hydroagricultural Projects',
      desc: '2nd cycle course of Agronomic Engineering, compulsory for the Rural Engineering specialisation',
      tag: '2nd Cycle',
    },
  },
  {
    icon: Droplets,
    pt: {
      title: 'Rega e Drenagem',
      desc: 'UC obrigatória do 2º ciclo de Engenharia Agronómica',
      tag: '2º Ciclo',
    },
    en: {
      title: 'Irrigation and Drainage',
      desc: 'Compulsory course of the 2nd cycle of Agronomic Engineering',
      tag: '2nd Cycle',
    },
  },
]

export default function DisciplinasPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'pt'

  const subtitle  = lang === 'pt'
    ? 'Unidades curriculares apoiadas pelo Laboratório Digital + Fab Lab de Rega'
    : 'Curricular units supported by the Digital Laboratory + Irrigation Fab Lab'
  const labelTag  = lang === 'pt' ? 'Disciplinas'   : 'Courses'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <WaterCursor />
      <Navbar subpage />
      <main style={{ paddingTop: '72px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <section className="section" style={{ borderTop: '1px solid hsl(var(--border))', position: 'relative', overflow: 'hidden', flex: 1 }}>
          <GhostImage
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80"
            side="right"
            opacity={0.14}
          />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <SectionHeader number="" label={labelTag} />

            <div style={{ marginBottom: '3rem' }}>
              <p style={{
                fontSize: '0.78rem',
                color: 'hsl(var(--muted-foreground))',
                maxWidth: '520px',
              }}>
                {subtitle}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1px',
              background: 'hsl(var(--border) / 0.5)',
              border: '1px solid hsl(var(--border))',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              {disciplines.map((d, i) => {
                const Icon = d.icon
                const content = d[lang]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    style={{
                      background: 'hsl(var(--background))',
                      padding: '2rem 2.5rem',
                      transition: 'background 0.25s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'hsl(var(--secondary) / 0.5)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'hsl(var(--background))'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <Icon size={20} strokeWidth={1.5} color="hsl(var(--primary))" />
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.6rem',
                        color: 'hsl(var(--muted-foreground) / 0.5)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        {content.tag}
                      </span>
                    </div>

                    <h3 style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'hsl(var(--foreground))',
                      letterSpacing: '-0.01em',
                      marginBottom: '0.6rem',
                    }}>
                      {content.title}
                    </h3>

                    <p style={{
                      fontSize: '0.85rem',
                      color: 'hsl(var(--muted-foreground))',
                      lineHeight: 1.65,
                    }}>
                      {content.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
