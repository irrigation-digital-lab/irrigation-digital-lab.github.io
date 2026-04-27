import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import logoGpt from '../assets/images/logo_gpt.png'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { dark, toggle } = useTheme()
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
    { key: 'about',    href: '#sobre' },
    { key: 'areas',    href: '#areas' },
    { key: 'whatwedo', href: '#oque-fazemos' },
    { key: 'fablab',   href: '#fablab' },
    { key: 'tools',    href: '#ferramentas' },
    { key: 'projects', href: '#projetos' },
    { key: 'partners', href: '#parcerias' },
    { key: 'contact',  href: '#contactos' },
  ]

  const scrollTo = (e, href) => {
    e.preventDefault()
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        background: scrolled
          ? 'hsl(var(--background) / 0.85)'
          : 'transparent',
        borderBottom: scrolled
          ? '1px solid hsl(var(--border))'
          : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 1px 24px hsl(var(--foreground) / 0.04)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, '#hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
        >
          <img
            src={logoGpt}
            alt="LDR Logo"
            style={{ height: '36px', width: 'auto', flexShrink: 0 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'hsl(var(--foreground))',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}>
              Irrigation
            </span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              color: 'hsl(var(--muted-foreground))',
              letterSpacing: '0.2em',
              lineHeight: 1,
              marginTop: '2px',
              textTransform: 'uppercase',
            }}>
              Digital Lab
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {links.map(l => (
            <a
              key={l.key}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              style={{
                padding: '0.4rem 0.85rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                fontWeight: 400,
                color: 'hsl(var(--muted-foreground))',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
                borderRadius: '4px',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'hsl(var(--foreground))'}
              onMouseLeave={e => e.currentTarget.style.color = 'hsl(var(--muted-foreground))'}
            >
              {t(`nav.${l.key}`)}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              background: 'transparent',
              border: '1px solid hsl(var(--border))',
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'hsl(var(--muted-foreground))',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'hsl(var(--foreground))'; e.currentTarget.style.color = 'hsl(var(--foreground))' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'hsl(var(--border))'; e.currentTarget.style.color = 'hsl(var(--muted-foreground))' }}
          >
            {dark ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'transparent',
              border: '1px solid hsl(var(--border))',
              borderRadius: '4px',
              padding: '0.3rem 0.65rem',
              cursor: 'pointer',
              color: 'hsl(var(--muted-foreground))',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'hsl(var(--foreground))'; e.currentTarget.style.color = 'hsl(var(--foreground))' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'hsl(var(--border))'; e.currentTarget.style.color = 'hsl(var(--muted-foreground))' }}
          >
            {i18n.language === 'pt' ? 'EN' : 'PT'}
          </button>

          {/* CTA — desktop */}
          <a
            href="#contactos"
            onClick={(e) => scrollTo(e, '#contactos')}
            className="desktop-nav"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.4rem 1rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'hsl(var(--foreground))',
              color: 'hsl(var(--background))',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {t('nav.contact')}
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: '22px',
                height: '1px',
                background: 'hsl(var(--muted-foreground))',
                transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6px) rotate(-45deg)'
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
              background: 'hsl(var(--background) / 0.97)',
              borderTop: '1px solid hsl(var(--border))',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
            }}
          >
            <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {links.map(l => (
                <a
                  key={l.key}
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.95rem',
                    color: 'hsl(var(--muted-foreground))',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                  }}
                >
                  {t(`nav.${l.key}`)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
