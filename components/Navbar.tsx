'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './Navbar.module.css'

const navLinks = ['About', 'Projects', 'Career', 'Contact']

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'career', 'projects', 'hero'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elTop = rect.top + window.scrollY;
          if (elTop <= scrollPosition) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    let targetId = id.toLowerCase();
    if (targetId === 'about') {
      targetId = 'hero';
    }
    const el = document.getElementById(targetId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef} className={styles.nav}>
      {/* Center links */}
      <div className={styles.linkGroup}>
        {navLinks.map((link) => {
          const targetId = link.toLowerCase() === 'about' ? 'hero' : link.toLowerCase();
          const isActive = activeSection === targetId;
          return (
            <button 
              key={link} 
              onClick={() => scrollTo(link)} 
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              {link.toUpperCase()}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

