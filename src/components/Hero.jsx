import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import heroBg from '../assets/images/hero_bg.png'

function TypewriterWord({ word, style }) {
  return (
    <span style={style}>
      {word}
      <span style={{
        display: 'inline-block',
        width: '3px',
        height: '0.85em',
        background: 'currentColor',
        marginLeft: '2px',
        verticalAlign: 'middle',
        animation: 'blink 0.7s step-end infinite',
      }} />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  )
}

const pillars = [
  'Precision_Irrigation',
  'Sensors_&_IoT',
  'Remote_Sensing',
  'Hydraulic_Modelling',
  'Water_accounting',
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
        justifyContent: 'flex-start',
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
          paddingBottom: '6rem',
          paddingTop: '4rem',
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
              {t('hero.title_line1')}
              <br />
              {t('hero.title_line2')}
              <br />
              <TypewriterWord word={t('hero.title_line3')} style={{ color: 'hsl(var(--muted-foreground) / 0.5)' }} />
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
              color: 'hsl(var(--foreground) / 0.75)',
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
                    color: 'hsl(var(--primary))',
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
                fontWeight: 700,
                color: 'hsl(var(--muted-foreground) / 0.85)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                38.7223° N, 9.1393° W — Lisbon, PT
              </p>
            </div>
          </motion.div>
        </div>

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
