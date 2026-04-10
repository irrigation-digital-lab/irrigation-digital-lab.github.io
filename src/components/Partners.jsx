import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import parceiro1 from '../assets/images/parceiro1.png'

export default function Partners() {
  const { t } = useTranslation()
  const partnerTypes = t('partners.types', { returnObjects: true })
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="parcerias" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem', textAlign: 'center' }}
        >
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>{t('partners.label')}</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>{t('partners.title')}</h2>
          <div className="divider" style={{ margin: '1.5rem auto' }} />
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>{t('partners.subtitle')}</p>
        </motion.div>

        {/* Partner type pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}
        >
          {partnerTypes.map((type, i) => (
            <span key={i} style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-light)',
              padding: '0.4rem 1rem',
              borderRadius: '100px',
              background: 'var(--bg-card)',
            }}>
              {type}
            </span>
          ))}
        </motion.div>

        {/* Logo showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            padding: '2rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
          }}
        >
          <img
            src={parceiro1}
            alt="Parceiro"
            style={{ height: '48px', width: 'auto', filter: 'grayscale(100%) brightness(1.5)', opacity: 0.6, transition: 'opacity 0.3s, filter 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'grayscale(0%) brightness(1)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.filter = 'grayscale(100%) brightness(1.5)' }}
          />
          {/* Placeholder slots */}
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              width: '100px',
              height: '40px',
              background: 'var(--border)',
              borderRadius: '3px',
              opacity: 0.3,
            }} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
