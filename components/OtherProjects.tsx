"use client";

import React, { useState } from 'react';
import styles from './OtherProjects.module.css';
import { otherProjects, IOtherProject } from '../data/projectsData';

const OtherProjects = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [hoveredProject, setHoveredProject] = useState<IOtherProject | null>(null);

  // 確保只取前 36 個項目
  const displayProjects = otherProjects.slice(0, 36);

  return (
    <div className={styles.container} ref={ref} id="other-projects-section">
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
        {displayProjects.map((project) => (
          <div
            key={project.id}
            className={styles.gridItem}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className={styles.imageWrapper}>
              <img src={project.image} alt={project.name} className={styles.projectImage} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

OtherProjects.displayName = 'OtherProjects';

export default OtherProjects;
