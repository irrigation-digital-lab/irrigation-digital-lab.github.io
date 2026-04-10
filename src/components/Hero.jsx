import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import logo2bg from '../assets/images/logo2bg.png'

export default function Hero() {
  const { t } = useTranslation()

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
  })

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '72px',
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(74,124,89,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom fade for smooth section transition */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '180px',
        background: 'linear-gradient(to bottom, transparent, var(--bg-deep))',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Grid lines decoration */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        opacity: 0.3,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* Logo float — positioned relative to section, outside container */}
      <motion.img
        src={logo2bg}
        alt=""
        className="hero-bg-image"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{ filter: 'grayscale(0%)' }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '780px' }}>

          {/* Tag */}
          <motion.div {...fadeUp(0.1)}>
            <span className="tag">
              <span>◆</span>
              {t('hero.tag')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fadeUp(0.25)}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
            }}
          >
            {t('hero.title').split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                {i === 1 ? <span style={{ color: 'var(--green-light)', fontStyle: 'italic' }}>{line}</span> : line}
              </span>
            ))}
          </motion.h1>

          {/* Divider */}
          <motion.div {...fadeUp(0.35)} className="divider" />

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.45)}
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: '620px',
              marginBottom: '2.5rem',
            }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.55)}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a href="#sobre" className="btn-primary">
              {t('hero.cta_primary')}
              <span>→</span>
            </a>
            <a href="#ferramentas" className="btn-outline">
              {t('hero.cta_secondary')}
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: '-2rem',
            left: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, var(--green-primary), transparent)',
          }} />
          <span style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
          }}>
            {t('hero.scroll')}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
