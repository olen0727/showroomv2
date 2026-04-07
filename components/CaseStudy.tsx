"use client";

import React, { useState } from 'react';
import styles from './CaseStudy.module.css';
import { caseStudies, ICaseStudy } from '../data/projectsData';

const CaseStudyItem = ({ study }: { study: ICaseStudy }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const images = Array.from({ length: study.imagesCount }).map((_, i) => {
    const num = study.padZero === false ? String(i + 1) : String(i + 1).padStart(2, '0');
    return `${study.imagesFolder}${num}.png`;
  });

  const hasImages = images.length > 0;

  const handlePrev = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => {
      const nextIndex = prev - 1;
      if (nextIndex <= 0) {
        setIsExpanded(false);
        return 0;
      }
      return nextIndex;
    });
  };

  const handleNext = () => {
    if (!hasImages) return;
    if (!isExpanded) {
      setIsExpanded(true);
      return;
    }
    setCurrentIndex((prev) => (prev === images.length - 1 ? prev : prev + 1));
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.contentArea}>
        <div className={styles.textContent}>
          <div className={styles.textWrapper}>
            <h3 className={styles.projectName}>{study.name}</h3>
            <p className={styles.projectDesc}>{study.description}</p>
          </div>
        </div>

        <div className={`${styles.sliderArea} ${isExpanded ? styles.expanded : ''}`}>
          {currentIndex > 0 && (
            <button className={styles.arrowBtnLeft} onClick={handlePrev} disabled={!hasImages}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          
          {(!isExpanded || currentIndex < images.length - 1) && (
            <button className={styles.arrowBtnRight} onClick={handleNext} disabled={!hasImages}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          
          <div className={styles.sliderWindow}>
            <div 
              className={styles.sliderTrack} 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {hasImages ? (
                images.map((img, idx) => (
                  <div key={idx} className={styles.slide}>
                    <img src={img} alt={`${study.name} slide ${idx + 1}`} className={styles.slideImage} />
                  </div>
                ))
              ) : (
                <div className={styles.slide}>
                  <div className={styles.placeholderImage}>No Image Available</div>
                </div>
              )}
            </div>
          </div>

          {hasImages && (
            <div className={styles.dotsContainer}>
              {images.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`} 
                  onClick={() => {
                    setCurrentIndex(idx);
                    if (idx === 0) setIsExpanded(false);
                    else setIsExpanded(true);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CaseStudy = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className={styles.caseStudySection} ref={ref} id="case-study-section">
      {caseStudies.map((study) => (
        <CaseStudyItem key={study.id} study={study} />
      ))}
    </div>
  );
});

CaseStudy.displayName = 'CaseStudy';

export default CaseStudy;
