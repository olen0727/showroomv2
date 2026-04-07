"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './SideProjects.module.css';
import { sideProjects } from '../data/projectsData';

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
    
    setActiveIndex(index);
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
                  <a href={activeProject.link} target="_blank" rel="noreferrer" className={styles.primaryLink}>Website</a>
                )}
                {activeProject.github && (
                  <a href={activeProject.github} target="_blank" rel="noreferrer" className={styles.secondaryLink}>GitHub</a>
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
