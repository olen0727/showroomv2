"use client";

import React, { useState } from 'react';
import styles from './CaseStudy.module.css';
import { caseStudies, ICaseStudy } from '../data/projectsData';

const CaseStudyItem = ({ study }: { study: ICaseStudy }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = Array.from({ length: study.imagesCount }).map((_, i) => 
    `${study.imagesFolder}${String(i + 1).padStart(2, '0')}.png`
  );

  const hasImages = images.length > 0;

  const handlePrev = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.stickyLabelWrapper}>
        <h2 className={styles.stickyLabel}>CaseStudy</h2>
      </div>
      
      <div className={styles.contentArea}>
        <div className={styles.textContent}>
          <button className={styles.arrowBtn} onClick={handlePrev} disabled={!hasImages}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className={styles.textWrapper}>
            <h3 className={styles.projectName}>{study.name}</h3>
            <p className={styles.projectDesc}>{study.description}</p>
          </div>
        </div>

        <div className={styles.sliderArea}>
          <button className={styles.arrowBtnRight} onClick={handleNext} disabled={!hasImages}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
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
                  onClick={() => setCurrentIndex(idx)}
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

const CaseStudy = () => {
  return (
    <div className={styles.caseStudySection}>
      {caseStudies.map((study) => (
        <CaseStudyItem key={study.id} study={study} />
      ))}
    </div>
  );
};

export default CaseStudy;
