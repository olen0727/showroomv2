"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './SideProjects.module.css';
import { sideProjects } from '../data/projectsData';

const WebsiteIcon = () => (
  <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 014.33-3.56A15.65 15.65 0 008.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.34.16-2h4.68c.09.66.16 1.32.16 2s-.07 1.34-.16 2zm1.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM19.74 14h-3.38c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2A10 10 0 0 0 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V20.94C14.5 21.28 14.66 21.6 15.17 21.5A10 10 0 0 0 12 2Z"/>
  </svg>
);

const SideProjects = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const activeProject = sideProjects[activeIndex];

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const maxScroll = rect.height - windowHeight;
      const scrolled = -rect.top;

      if (scrolled >= 0 && scrolled <= maxScroll) {
        const progress = scrolled / maxScroll;
        const newIndex = Math.min(
          sideProjects.length - 1,
          Math.floor(progress * sideProjects.length)
        );
        setActiveIndex(newIndex);
      } else if (scrolled < 0) {
        setActiveIndex(0);
      } else if (scrolled > maxScroll) {
        setActiveIndex(sideProjects.length - 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (index: number) => {
    if (!containerRef.current) return;
    const windowHeight = window.innerHeight;
    const rect = containerRef.current.getBoundingClientRect();
    const maxScroll = rect.height - windowHeight;
    
    const targetProgress = (index + 0.5) / sideProjects.length;
    const targetScrollY = window.scrollY + rect.top + targetProgress * maxScroll;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={styles.container} 
      ref={setRefs} 
      id="side-projects-section"
      style={{ height: `${sideProjects.length * 100}vh` }}
    >
      <div className={styles.stickyContent}>
        <div className={styles.contentArea}>
          <div
            className={styles.mainDisplay}
            style={{ backgroundImage: `url(${activeProject.image})` }}
          >
            <div className={styles.overlay} />
            <div className={styles.mainContent}>
              <div className={styles.projectCoverWrapper}>
                <img src={activeProject.image} alt={activeProject.name} className={styles.projectCover} />
              </div>
              <h3 className={styles.projectTitle}>{activeProject.name}</h3>
              <p className={styles.projectDesc}>{activeProject.description}</p>

              <div className={styles.tagsContainer}>
                {activeProject.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              <div className={styles.linksContainer}>
                {activeProject.link && (
                  <a href={activeProject.link} target="_blank" rel="noreferrer" className={styles.primaryLink}>
                    <WebsiteIcon /> Website
                  </a>
                )}
                {activeProject.github && (
                  <a href={activeProject.github} target="_blank" rel="noreferrer" className={styles.secondaryLink}>
                    <GitHubIcon /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className={styles.listArea}>
            {sideProjects.map((project, index) => (
              <div
                key={project.id}
                className={`${styles.listItem} ${activeIndex === index ? styles.activeItem : ''}`}
                onClick={() => handleItemClick(index)}
              >
                <h4 className={styles.listTitle}>{project.name}</h4>
                <p className={styles.listDesc}>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

SideProjects.displayName = 'SideProjects';

export default SideProjects;
