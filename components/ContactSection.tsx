"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const EmailIcon = () => (
  <svg className={styles.linkIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 20 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className={styles.linkIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C13.88 9.94 13.25 10.7 12.92 11.23V10.12H10.13V18.5H12.92V13.57C12.92 12.27 13.54 11.9 14.28 11.9C15.11 11.9 15.71 12.55 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.2 6.88 5.2A1.69 1.69 0 0 0 5.19 6.88C5.19 7.82 5.95 8.56 6.88 8.56M8.27 18.5V10.12H5.5V18.5H8.27Z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className={styles.linkIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2A10 10 0 0 0 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V20.94C14.5 21.28 14.66 21.6 15.17 21.5A10 10 0 0 0 12 2Z"/>
  </svg>
);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 標題進入動畫
      if (titleContainerRef.current) {
        gsap.fromTo(titleContainerRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
            }
          }
        );
      }

      // 連結交錯顯示特效 (Stagger)
      if (linksRef.current) {
        const linkElements = linksRef.current.children;
        gsap.fromTo(linkElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.contactSection} id="contact" ref={sectionRef}>
      <div className={`${styles.glowBackground} ${hoveredLink ? styles[hoveredLink] : ''}`}></div>
      
      <div className={styles.content}>
        <div className={styles.titleContainer} ref={titleContainerRef}>
          {/* Base Title */}
          <h2 className={styles.title} style={{ opacity: hoveredLink ? 0 : 1 }}>
            Let's <br /> Connect
          </h2>
          
          {/* Overlays for Mask Text Gradients */}
          <h2 className={`${styles.title} ${styles.titleOverlay} ${styles.overlayEmail}`} 
              style={{ opacity: hoveredLink === 'email' ? 1 : 0 }}>
            Let's <br /> Connect
          </h2>
          <h2 className={`${styles.title} ${styles.titleOverlay} ${styles.overlayLinkedin}`} 
              style={{ opacity: hoveredLink === 'linkedin' ? 1 : 0 }}>
            Let's <br /> Connect
          </h2>
          <h2 className={`${styles.title} ${styles.titleOverlay} ${styles.overlayGithub}`} 
              style={{ opacity: hoveredLink === 'github' ? 1 : 0 }}>
            Let's <br /> Connect
          </h2>
        </div>
        
        <div className={styles.linksContainer} ref={linksRef}>
          <a 
            href="mailto:your.email@example.com" 
            className={`${styles.linkItem} ${styles.email}`} 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredLink('email')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <EmailIcon />
            <span>Email</span>
          </a>
          
          <a 
            href="https://linkedin.com/" 
            className={`${styles.linkItem} ${styles.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredLink('linkedin')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
          
          <a 
            href="https://github.com/" 
            className={`${styles.linkItem} ${styles.github}`} 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredLink('github')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
