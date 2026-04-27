import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from './About'
import parceiro1 from '../assets/images/parceiro1.png'

export default function Partners() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const partnerTypes = t('partners.types', { returnObjects: true })

  return (
    <section id="parcerias" className="section" ref={ref} style={{ borderTop: '1px solid hsl(var(--border))' }}>
      <div className="container">
        <SectionHeader number="07" label={t('partners.label')} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem', maxWidth: '640px' }}
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

        {/* Partner type tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          {partnerTypes.map((type, i) => (
            <span key={i} style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              color: 'hsl(var(--muted-foreground))',
              border: '1px solid hsl(var(--border))',
              padding: '0.35rem 0.9rem',
              borderRadius: '100px',
              background: 'hsl(var(--secondary))',
            }}>
              {type}
            </span>
          ))}
        </motion.div>

        {/* Logo showcase */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            padding: '2.5rem',
            background: 'hsl(var(--secondary))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '4px',
          }}
        >
          <img
            src={parceiro1}
            alt="Partner"
            style={{
              height: '44px',
              width: 'auto',
              filter: 'grayscale(100%)',
              opacity: 0.45,
              transition: 'opacity 0.3s, filter 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'grayscale(0%)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.45'; e.currentTarget.style.filter = 'grayscale(100%)' }}
          />
          {/* Placeholder slots */}
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              width: '90px',
              height: '36px',
              background: 'hsl(var(--border))',
              borderRadius: '3px',
              opacity: 0.35,
            }} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
