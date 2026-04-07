"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProjectsSection.module.css';
import CaseStudy from './CaseStudy';
import SideProjects from './SideProjects';
import OtherProjects from './OtherProjects';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const sectionNames: Record<string, string> = {
  'case-study-section': 'Case Study',
  'side-projects-section': 'Side Projects',
  'other-projects-section': 'Other Projects',
};

const ProjectsSection = () => {
  const caseStudyRef = useRef<HTMLDivElement>(null);
  const sideProjectsRef = useRef<HTMLDivElement>(null);
  const otherProjectsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLHeadingElement>(null);

  const [activeId, setActiveId] = useState<string>('case-study-section');

  // 使用 ref 來記錄每個區塊目前在可視範圍內的比例
  const ratiosRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // 記錄這次觸發變化時的各區塊交集比例
      entries.forEach((entry) => {
        ratiosRef.current[entry.target.id] = entry.intersectionRatio;
      });

      // 找出畫面上佔地面積最大的區塊當作目前的 Active 區塊
      let maxRatio = 0.1;
      let targetId = activeId;

      Object.entries(ratiosRef.current).forEach(([id, ratio]) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          targetId = id;
        }
      });

      setActiveId((prev) => (prev !== targetId ? targetId : prev));
    }, {
      root: null,
      // 建立多個偵測中繼點，不論是滾上滾下都能即時反映佔比
      threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
      rootMargin: '-5% 0px -5% 0px'
    });

    if (caseStudyRef.current) observer.observe(caseStudyRef.current);
    if (sideProjectsRef.current) observer.observe(sideProjectsRef.current);
    if (otherProjectsRef.current) observer.observe(otherProjectsRef.current);

    return () => observer.disconnect();
  }, [activeId]);

  useEffect(() => {
    if (!labelRef.current) return;

    const newText = sectionNames[activeId] || 'Projects';

    // 先淡出舊文字，成功後清空並開始打字顯示新文字
    gsap.to(labelRef.current, {
      duration: 0.2,
      opacity: 0,
      ease: "power2.inOut",
      onComplete: () => {
        if (labelRef.current) labelRef.current.innerText = "";

        gsap.to(labelRef.current, {
          duration: 0.6,
          opacity: 1,
          text: newText,
          ease: "power2.out",
        });
      }
    });

  }, [activeId]);

  useEffect(() => {
    const sections = [caseStudyRef.current, sideProjectsRef.current, otherProjectsRef.current];
    sections.forEach((sec) => {
      if (!sec) return;

      gsap.fromTo(sec,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.sectionHeader}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title} data-text="Projects">Projects</h1>
          <div className={styles.subtitleWrapper}>
            <span className={styles.subtitleDash}></span>
            <span className={styles.subtitle}>FEATURED WORKS</span>
          </div>
        </div>
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.globalStickySidebar}>
          <h2 className={styles.sidebarLabel} ref={labelRef}>CaseStudy</h2>
        </div>

        <div className={styles.sectionsContainer}>
          <CaseStudy ref={caseStudyRef} />
          <SideProjects ref={sideProjectsRef} />
          <OtherProjects ref={otherProjectsRef} />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
