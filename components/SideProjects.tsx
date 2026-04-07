"use client";

import React, { useState } from 'react';
import styles from './SideProjects.module.css';
import { sideProjects } from '../data/projectsData';

const SideProjects = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [activeProject, setActiveProject] = useState(sideProjects[0]);

  return (
    <div className={styles.container} ref={ref} id="side-projects-section">
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
          {sideProjects.map((project) => (
            <div
              key={project.id}
              className={`${styles.listItem} ${activeProject.id === project.id ? styles.activeItem : ''}`}
              onClick={() => setActiveProject(project)}
            >
              <h4 className={styles.listTitle}>{project.name}</h4>
              <p className={styles.listDesc}>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

SideProjects.displayName = 'SideProjects';

export default SideProjects;
