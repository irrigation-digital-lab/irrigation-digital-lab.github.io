import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import heroBg from '../assets/images/hero_bg.png'

const pillars = [
  'Precision_Irrigation',
  'Sensors_&_IoT',
  'Remote_Sensing',
  'Hydraulic_Modelling',
  'Water_Audit_Systems',
]

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        paddingTop: '72px',
      }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={heroBg}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Gradient overlays — para legibilidade do texto */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.75) 40%, hsl(var(--background) / 0.3) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, hsl(var(--background) / 0.6) 0%, transparent 60%)',
        }} />
      </div>

      {/* Blueprint grid sobre a imagem */}
      <div
        className="blueprint-grid"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          paddingBottom: '5rem',
          paddingTop: '2rem',
        }}
      >
        <div className="hero-grid">

          {/* Left — Title */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'hsl(var(--primary))',
                marginBottom: '1.5rem',
              }}
            >
              {t('hero.tag')} — Digital Lab
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: 'hsl(var(--foreground))',
              }}
            >
              IRRIGATION
              <br />
              <span style={{ color: 'hsl(var(--muted-foreground) / 0.5)' }}>DIGITAL</span>
              <br />
              LAB
            </motion.h1>
          </div>

          {/* Center — Vertical divider line */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              width: '1px',
              height: '200px',
              background: 'hsl(var(--border))',
              alignSelf: 'flex-end',
              transformOrigin: 'bottom',
            }}
          />

          {/* Right — Subtitle, pillars, coordinates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <p style={{
              fontSize: '0.9rem',
              color: 'hsl(var(--muted-foreground))',
              lineHeight: 1.75,
              maxWidth: '420px',
            }}>
              {t('hero.subtitle')}
            </p>

            {/* Technical pillars */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 0.75rem' }}>
              {pillars.map((p, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    color: 'hsl(var(--primary) / 0.8)',
                    letterSpacing: '0.05em',
                  }}
                >
                  /{p}
                </span>
              ))}
            </div>

            {/* Coordinates */}
            <div style={{
              paddingTop: '1rem',
              borderTop: '1px solid hsl(var(--border) / 0.6)',
            }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                color: 'hsl(var(--muted-foreground) / 0.5)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                38.7223° N, 9.1393° W — Lisbon, PT
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: 'flex', gap: '0.75rem', marginTop: '3rem', flexWrap: 'wrap' }}
        >
          <a
            href="#sobre"
            onClick={(e) => { e.preventDefault(); document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.5rem',
              background: 'hsl(var(--foreground))',
              color: 'hsl(var(--background))',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '4px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {t('hero.cta_primary')}
          </a>
          <a
            href="#ferramentas"
            onClick={(e) => { e.preventDefault(); document.getElementById('ferramentas')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.5rem',
              background: 'transparent',
              color: 'hsl(var(--foreground))',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '4px',
              border: '1px solid hsl(var(--border))',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'hsl(var(--foreground))'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'hsl(var(--border))'}
          >
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
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 4,
        }}
      >
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.55rem',
          letterSpacing: '0.3em',
          color: 'hsl(var(--muted-foreground) / 0.5)',
          textTransform: 'uppercase',
        }}>
          {t('hero.scroll')}
        </span>
        <div style={{
          width: '1px',
          height: '32px',
          background: 'hsl(var(--border))',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '12px',
              background: 'hsl(var(--primary) / 0.6)',
            }}
            animate={{ y: [-12, 44] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
