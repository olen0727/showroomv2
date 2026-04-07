'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Navbar.module.css'

const navLinks = ['About', 'Projects', 'Contact']

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

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
    <nav ref={navRef} className={styles.nav}>
      {/* Center links */}
      <div className={styles.linkGroup}>
        {navLinks.map((link) => (
          <button key={link} onClick={() => scrollTo(link)} className={styles.navLink}>
            {link.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  )
}

