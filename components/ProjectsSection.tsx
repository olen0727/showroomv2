import React from 'react';
import styles from './ProjectsSection.module.css';
import CaseStudy from './CaseStudy';
import SideProjects from './SideProjects';
import OtherProjects from './OtherProjects';

const ProjectsSection = () => {
  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.sectionHeader}>
        <h1 className={styles.title}>Projects</h1>
      </div>
      <CaseStudy />
      <SideProjects />
      <OtherProjects />
    </section>
  );
};

export default ProjectsSection;
