"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { careers } from '@/data/careersData';
import styles from './CareerSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const CareerSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 使用 gsap.context 確保卸載時清除相關的 scroll triggers 和 animations
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
            }
          }
        );
      }

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const resps = card.querySelectorAll(`.${styles.respItem}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
        ).fromTo(resps,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
          "-=0.4" // 與前段動畫重疊，增添流暢度
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.careerSection} id="career" ref={sectionRef}>
      <div className={styles.stickySidebar} ref={titleRef}>
        <h2 className={styles.title}>
          Career<br />Path
        </h2>
        <p className={styles.subtitle}>My professional journey across different roles and domains.</p>
      </div>

      <div className={styles.cardsContainer}>
        {careers.map((career, index) => {
          const companies = Array.isArray(career.company) ? career.company : [career.company];
          return (
            <div 
              key={career.id} 
              className={styles.card}
              ref={el => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.role}>{career.role}</div>
                  <div className={styles.time}>{career.time}</div>
                </div>
                
                <div className={styles.companies}>
                  {companies.map((comp, i) => (
                    <span key={i} className={styles.companyTag}>{comp}</span>
                  ))}
                </div>

                <ul className={styles.responsibilities}>
                  {career.responsibilities.map((resp, i) => (
                    <li key={i} className={styles.respItem}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CareerSection;
