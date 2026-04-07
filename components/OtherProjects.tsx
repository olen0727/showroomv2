"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './OtherProjects.module.css';
import { otherProjects, IOtherProject } from '../data/projectsData';

const OtherProjects = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [hoveredProject, setHoveredProject] = useState<IOtherProject | null>(null);
  const [shuffledProjects, setShuffledProjects] = useState<IOtherProject[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // 確保在客戶端才打亂順序，避免 Hydration Mismatch
  useEffect(() => {
    setMounted(true);
    const shuffled = [...otherProjects].sort(() => 0.5 - Math.random()).slice(0, 36);
    setShuffledProjects(shuffled);
  }, []);

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? shuffledProjects.length - 1 : prev - 1) : null));
  }, [shuffledProjects.length]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === shuffledProjects.length - 1 ? 0 : prev + 1) : null));
  }, [shuffledProjects.length]);

  // 置中已選取的縮圖
  useEffect(() => {
    if (selectedIndex !== null && thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const activeThumb = container.children[selectedIndex] as HTMLElement;
      if (activeThumb) {
        const scrollLeft = activeThumb.offsetLeft - (container.offsetWidth / 2) + (activeThumb.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // 原生阻止預設事件向上傳遞，同時關閉原生 Body Scroll
  useEffect(() => {
    if (selectedIndex !== null) {
      const modal = document.getElementById('other-projects-modal');
      const stopProp = (e: Event) => {
        e.stopPropagation();
      };
      
      if (modal) {
        modal.addEventListener('wheel', stopProp, { passive: false });
        modal.addEventListener('touchmove', stopProp, { passive: false });
      }
      
      document.body.style.overflow = 'hidden';
      
      return () => {
        if (modal) {
          modal.removeEventListener('wheel', stopProp);
          modal.removeEventListener('touchmove', stopProp);
        }
        document.body.style.overflow = '';
      };
    }
  }, [selectedIndex]);

  const modalContent = selectedIndex !== null ? (
    <div 
      id="other-projects-modal"
      className={styles.modalOverlay} 
      onClick={() => setSelectedIndex(null)}
    >
      <button className={styles.closeButton} onClick={() => setSelectedIndex(null)}>✕</button>

      <button className={styles.navLeft} onClick={handlePrev}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalMainVisual}>
          <img
            src={shuffledProjects[selectedIndex].image}
            alt={shuffledProjects[selectedIndex].name}
            className={styles.modalMainImage}
          />
        </div>
        <div className={styles.modalInfo}>
          <h3 className={styles.modalTitle}>{shuffledProjects[selectedIndex].name}</h3>
          <p className={styles.modalDesc}>{shuffledProjects[selectedIndex].description}</p>
          <div className={styles.modalTags}>
            {shuffledProjects[selectedIndex].tags.map(tag => (
              <span key={tag} className={styles.modalTag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <button className={styles.navRight} onClick={handleNext}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={styles.thumbnailContainer} ref={thumbnailContainerRef} onClick={(e) => e.stopPropagation()}>
        {shuffledProjects.map((proj, idx) => (
          <div
            key={proj.id}
            className={`${styles.thumbnailWrapper} ${idx === selectedIndex ? styles.activeThumbnail : ''}`}
            onClick={() => setSelectedIndex(idx)}
          >
            <img src={proj.image} alt={proj.name} className={styles.thumbnailImage} />
          </div>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className={styles.container} ref={ref} id="other-projects-section">
      <div className={styles.stickyContent}>
        <div className={styles.gridContainer}>
          {/* 中央資訊區，CSS Grid 屬性設定它佔據特定的中心欄位 */}
          <div className={styles.centerInfoArea}>
            {hoveredProject ? (
              <div className={styles.infoContent}>
                <h3 className={styles.infoTitle}>{hoveredProject.name}</h3>
                <p className={styles.infoDesc}>{hoveredProject.description}</p>
              </div>
            ) : (
              <div className={styles.infoPlaceholder}>
                <h3 className={styles.infoTitle}>Other Projects</h3>
                <p>Hover over a project to see details.</p>
              </div>
            )}
          </div>

          {/* 網格圖片項目 */}
          {shuffledProjects.map((project, index) => (
            <div
              key={project.id}
              className={styles.gridItem}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedIndex(index)}
            >
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.name} className={styles.projectImage} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 燈光秀 / Modal 區塊，用 React Portal 獨立渲於文件最上層，遠離 Transform 影響 */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </div>
  );
});

OtherProjects.displayName = 'OtherProjects';

export default OtherProjects;
