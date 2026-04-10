import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import logo1 from '../assets/images/logo1.png'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt')
  }

  const links = [
    { key: 'about', href: '#sobre' },
    { key: 'areas', href: '#areas' },
    { key: 'whatwedo', href: '#oque-fazemos' },
    { key: 'fablab', href: '#fablab' },
    { key: 'tools', href: '#ferramentas' },
    { key: 'projects', href: '#projetos' },
    { key: 'partners', href: '#parcerias' },
    { key: 'contact', href: '#contactos' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.4s ease, border-color 0.4s ease',
        background: scrolled ? 'rgba(11, 20, 10, 0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img src={logo1} alt="LDR Logo" style={{ height: '36px', width: 'auto' }} />
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
            Laboratório<br />
            <span style={{ color: 'var(--green-light)', fontStyle: 'italic' }}>Digital de Rega</span>
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {links.map(l => (
            <a
              key={l.key}
              href={l.href}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--green-light)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {t(`nav.${l.key}`)}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'transparent',
              border: '1px solid var(--border-light)',
              borderRadius: '3px',
              padding: '0.35rem 0.7rem',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green-primary)'; e.currentTarget.style.color = 'var(--green-light)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            <span style={{ fontSize: '0.9rem' }}>🌐</span>
            {i18n.language === 'pt' ? 'EN' : 'PT'}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: 'var(--text-secondary)',
                transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(11, 20, 10, 0.98)',
              borderTop: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {links.map(l => (
                <a
                  key={l.key}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                  }}
                >
                  {t(`nav.${l.key}`)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex; }
        .hamburger { display: none; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  )
}
