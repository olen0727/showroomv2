'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const navLinks = ['About', 'Projects', 'Contact']

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef} style={styles.nav}>
      {/* Center links */}
      <div style={styles.linkGroup}>
        {navLinks.map((link) => (
          <button key={link} onClick={() => scrollTo(link)} style={styles.navLink}>
            {link.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Right actions */}
      <div style={styles.actions}>
        <a href="#contact" style={styles.ctaButton}>
          GET IN TOUCH
        </a>
        <button
          onClick={() => setMuted((m) => !m)}
          style={styles.muteBtn}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </div>
    </nav>
  )
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 48px',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  linkGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.55)',
    borderRadius: '9999px',
    padding: '8px 20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  navLink: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    color: '#1a1a1a',
    padding: '6px 16px',
    borderRadius: '9999px',
    transition: 'background 0.2s',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    position: 'absolute',
    right: '48px',
  },
  ctaButton: {
    background: '#f97316',
    color: '#fff',
    fontWeight: 700,
    fontSize: '13px',
    letterSpacing: '0.06em',
    padding: '10px 22px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background 0.2s, transform 0.15s',
    display: 'inline-block',
  },
  muteBtn: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.12)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  },
}
